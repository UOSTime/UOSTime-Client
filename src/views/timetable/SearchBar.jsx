import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import {
  Container,
  makeStyles,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Divider,
} from '@material-ui/core';
import { searchLectureListState } from '@states/Lecture';
import { semesterState } from '@states/Semester';
import { requestAPI, API_GET_ALL_LECTURES } from '@utils/api';
import { convertSemesterToString, convertStringToSemester, getAllSemesters } from '@utils/semester';

const setValue = setter => e => setter(e.target.value);

const SelectSemester = ({ selectedSemester, onChangeSemester }) => {
  const semesters = getAllSemesters();
  const nSemesters = semesters.length;

  const semesterOptions = [];
  for (let i = 0; i < nSemesters; i++) {
    semesterOptions.push((
      <MenuItem
        key={semesters[i].value}
        value={semesters[i].value}
      >
        {semesters[i].text}
      </MenuItem>
    ));
    if (i % 4 === 3 && i !== nSemesters - 1) {
      semesterOptions.push(<Divider key={`divider-${i}`} />);
    }
  }

  return (
    <Select value={convertSemesterToString(selectedSemester)} onChange={onChangeSemester} variant="outlined">
      {semesterOptions.reverse()}
    </Select>
  );
};

const getSearchTypeOptions = () => {
  const searchOption = {
    sub_dept: '학부(과)',
    subject_div: '과목구분',
    subject_div2: '세부과목',
    subject_no: '과목번호',
    subject_nm: '과목명',
    shyr: '학년',
    credit: '학점',
    prof_nm: '교수명',
  };
  return Object.entries(searchOption).map(([code, name]) => (
    <MenuItem key={name} value={code}>{name}</MenuItem>
  ));
};

export default function SearchBar() {
  const setSearchLectureListState = useSetRecoilState(searchLectureListState);

  const [selectedSemester, setSelectedSemester] = useRecoilState(semesterState);
  const [searchType, setSearchType] = useState('subject_nm');
  const [keyword, setKeyword] = useState('');

  const classes = useStyles();

  useEffect(() => {
    onSearch();
  }, [selectedSemester, searchType, keyword]);

  const onChangeSemester = e => {
    setSelectedSemester(convertStringToSemester(e.target.value));
  };

  const onSearch = async () => {
    const trimmedKeyword = keyword.trim();

    // handle exception: no keyword
    if (!trimmedKeyword) return;

    const { year, term } = selectedSemester;
    const response = await requestAPI(API_GET_ALL_LECTURES({
      year,
      term,
      searchType,
      keyword: trimmedKeyword,
    }));

    if (!response) {
      // TODO: edit
      alert('검색 도중 문제가 발생했어요.');
      return;
    }

    if (response.status === StatusCodes.OK) {
      setSearchLectureListState(response.data);
    } else {
      // TODO: edit
      alert(response.data);
    }
  };

  return (
    <Container className={classes.root}>
      <FormControl size="small">
        <SelectSemester
          selectedSemester={selectedSemester}
          onChangeSemester={onChangeSemester}
        />
      </FormControl>
      <FormControl size="small">
        <Select value={searchType} onChange={setValue(setSearchType)} variant="outlined">
          {getSearchTypeOptions()}
        </Select>
      </FormControl>
      <FormControl className={classes.input}>
        <TextField onChange={setValue(setKeyword)} value={keyword} variant="outlined" size="small" />
      </FormControl>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gap: '1em',
    margin: '0',
    padding: '1em 0',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('lg')]: {
      flexGrow: '2',
      width: 'auto',
      gridTemplateColumns: '1fr 1fr 2fr',
    },
  },
  input: {
    [theme.breakpoints.down('lg')]: {
      gridColumn: '1 / 3',
      gridRow: '2',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '3',
      gridRow: '1',
    },
  },
}));
