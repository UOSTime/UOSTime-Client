import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { timetableListState, currentTimetableIndexState } from '@states/Timetable';
import { searchLectureListState } from '@states/Lecture';
import {
  requestAPI,
  API_GET_TIMETABLES,
} from '@utils/api';
import Timetable from './Timetable';
import LectureList from './LectureList';
import TimetableCardList from './TimetableCardList';
import SearchBar from './SearchBar';

export default function Home() {
  const [timetableList, setTimetableList] = useRecoilState(timetableListState);
  const [lectureListType, setLectureListType] = useState('search');
  const [currentTimetableIndex, setCurrentTimetableIndex] = useRecoilState(currentTimetableIndexState);
  const searchLectureList = useRecoilValue(searchLectureListState);

  const classes = useStyles();

  const getTimetables = async () => {
    const response = await requestAPI(API_GET_TIMETABLES({
      year: 2021,
      term: 'A10',
    }));

    if (!response || response.status !== StatusCodes.OK) {
      alert('시간표를 가져오는데 실패했어요');
      return;
    }

    const timetables = response.data;
    setTimetableList(timetables);
    setCurrentTimetableIndex(0);
  };

  useEffect(() => {
    if (!localStorage.getItem('userID')) return;
    getTimetables();
  }, []);

  if (!localStorage.getItem('userID')) {
    return <Redirect to="/login" />;
  }

  return (
    <Container className={classes.root}>
      <SearchBar />

      <Box className={classes.innerRoot}>
        <Box className={classes.mainContent}>
          {lectureListType === 'search' && (
            <>
              <Button onClick={() => setLectureListType('timetable')}>내 강의 보기</Button>
              <LectureList
                lectureList={searchLectureList}
                emptyText="(검색결과 없음)"
              />
            </>
          )}
          {lectureListType === 'timetable' && (
            <>
              <Button onClick={() => setLectureListType('search')}>검색결과 보기</Button>
              <LectureList
                lectureList={timetableList.length ? timetableList[currentTimetableIndex].tlecture_list.map(tlecture => tlecture.lecture) : []}
                emptyText="(빈 시간표)"
              />
            </>
          )}
        </Box>
        <Box className={classes.mainContent}>
          <TimetableCardList />
          {timetableList.length && <Timetable />}
        </Box>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  innerRoot: {
    display: 'grid',
    gridTemplateRows: 'minmax(50em, auto)',
    gridTemplateColumns: 'repeat(2, minmax(50%, 50%))',
    flex: '1',
    // flexDirection: 'row',
    flexGrow: '1',
    margin: '1em 0',
  },
  mainContent: {
    gridRow: '1',
    // flex: '1',
    padding: '1em',
  },
  timetableTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0px 10px 0px',
    '& button': {
      fontSize: '1.5rem',
      padding: '0',
      lineHeight: '1.5rem',
    },
  },
  timetableTitleUtils: {
    width: '70px',
    margin: '0',
    padding: '0',
  },
  tableNameChangeContainer: {
    width: '300px',
    display: 'flex',
    padding: '0',
    margin: '0',
  },
  sideBarPanel: {
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
    padding: '0',
  },
  lectureTop: {},
  tableNameBtn: {
    fontSize: '1.5rem',
    '& span': {
      lineHeight: '1.5rem',
    },
  },
  tableNameInput: {
    fontSize: '1.5rem',
    width: '60%',
  },
});
