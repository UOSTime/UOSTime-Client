import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button, Container, makeStyles } from '@material-ui/core';
import { currentTimetableIndexState, timetableListState } from '@states/Timetable';
import { searchLectureListState } from '@states/Lecture';
import Timetable from './Timetable';
import LectureList from './LectureList';
import TimetableCardList, { useTimetableList } from './TimetableCardList';
import SearchBar from './SearchBar';

export default function Home() {
  const timetableList = useRecoilValue(timetableListState);
  const [lectureListType, setLectureListType] = useState('search');
  const currentTimetableIndex = useRecoilValue(currentTimetableIndexState);
  const searchLectureList = useRecoilValue(searchLectureListState);
  const [, fetchTimetables] = useTimetableList();

  const classes = useStyles();

  useEffect(() => {
    fetchTimetables();
  }, []);

  return (
    <Container className={classes.root}>
      <SearchBar />
      <Box className={classes.innerRoot}>
        <Box className={classes.mainContent}>
          {lectureListType === 'search' && (
            <>
              <Button onClick={() => setLectureListType('timetable')}>내 강의 보기</Button>
              <LectureList
                className={classes.lectureList}
                lectureList={searchLectureList}
                emptyText="(검색결과 없음)"
                type={lectureListType}
              />
            </>
          )}
          {lectureListType === 'timetable' && (
            <>
              <Button onClick={() => setLectureListType('search')}>검색결과 보기</Button>
              <LectureList
                className={classes.lectureList}
                lectureList={timetableList.length ? timetableList[currentTimetableIndex].tlecture_list.map(tlecture => tlecture.lecture) : []}
                emptyText="(빈 시간표)"
                type={lectureListType}
              />
            </>
          )}
        </Box>
        <Box className={classes.mainContent}>
          <TimetableCardList />
          {currentTimetableIndex < timetableList.length && <Timetable />}
        </Box>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  innerRoot: {
    flex: '1',
    flexGrow: '1',
    margin: '1em 0',
    maxHeight: '100vh', // TODO: 시간표 노출 제약 확인 필요
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateRows: 'minmax(50em, 1fr)',
      gridTemplateColumns: '50% 50%',
    },
  },
  mainContent: {
    gridRow: '1',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
      padding: '0',
    },
    [theme.breakpoints.up('lg')]: {
      '&:first-child': {
        paddingRight: '1em',
      },
      '&:last-child': {
        paddingLeft: '1em',
      },
    },
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
}));
