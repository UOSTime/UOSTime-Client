import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
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
import { requestAPI, API_GET_ALL_LECTURES } from '@utils/api';
import { getTermsAsArray, getTermNamebyCode } from '@utils/semester';
import { getToday } from '@utils/time';

const setValue = setter => e => setter(e.target.value);

const getSemesterValue = (year, term) => `${year}-${term}`;

const getSemesterOptions = () => {
  const terms = getTermsAsArray().reverse();
  const { year, month } = getToday();

  const semesterOptions = [];

  for (let i = 0; i < 4; i++) {
    terms.forEach(term => {
      if (i || month >= term.month) {
        semesterOptions.push((
          <MenuItem
            key={getSemesterValue(year - i, term.code)}
            value={getSemesterValue(year - i, term.code)}
          >
            {`${year - i}년 ${getTermNamebyCode(term.code)}`}
          </MenuItem>
        ));
      }
    });
    semesterOptions.push(<Divider key={i} />);
  }

  semesterOptions.pop();
  return semesterOptions;
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

  const [selectedSemester, setSelectedSemester] = useState(getSemesterValue(2021, 'A10')); // TODO: set default value
  const [searchType, setSearchType] = useState('subject_nm');
  const [keyword, setKeyword] = useState('');

  const classes = useStyles();

  useEffect(() => {
    onSearch();
  }, [selectedSemester, searchType, keyword]);

  const onSearch = async () => {
    const [year, term] = selectedSemester.split('-');
    const query = {
      year,
      term,
      searchType,
      keyword: keyword.trim(),
    };

    // handle exception: no keyword
    if (!query.keyword) return;

    const response = await requestAPI(API_GET_ALL_LECTURES(query));

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
        <Select value={selectedSemester} onChange={setValue(setSelectedSemester)} variant="outlined">
          {getSemesterOptions()}
        </Select>
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
