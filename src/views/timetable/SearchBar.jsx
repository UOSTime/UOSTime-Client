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
} from '@material-ui/core';
import { searchLectureListState } from '@states/Lecture';
import { requestAPI, API_GET_ALL_LECTURES } from '@utils/api';

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

export default function SearchBar() {
  const setSearchLectureListState = useSetRecoilState(searchLectureListState);
  const [searchType, setSearchType] = useState('subject_nm');
  const [keyword, setKeyword] = useState('');

  const classes = useStyles();

  const onSelectSearchType = e => {
    setSearchType(e.target.value);
  };

  const onTypeKeyword = e => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    onSearch();
  }, [searchType, keyword]);

  const onSearch = async () => {
    const query = {
      year: 2021,
      term: 'A10',
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
      <FormControl className={classes.select} size="small">
        <Select value={searchType} onChange={onSelectSearchType} variant="outlined">
          {Object.entries(searchOption).map(([code, name]) => (
            <MenuItem key={name} value={code}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.input}>
        <TextField onChange={onTypeKeyword} value={keyword} variant="outlined" size="small" />
      </FormControl>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: '0.5em 0',
  },
  select: {
    flexGrow: '1',
  },
  input: {
    flexGrow: '2',
    marginLeft: '1em',
  },
});
