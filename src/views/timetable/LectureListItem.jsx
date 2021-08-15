import React, { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import {
  makeStyles,
  Container,
  Box,
  Button,
  ListItem,
} from '@material-ui/core';
import { requestAPI, API_ADD_TLECTURE, API_DELETE_TLECTURE } from '@utils/api';
import { currentTimetableIndexState, timetableListState } from '@states/Timetable';
import { highLightLectureState } from '@states/Lecture';
import { useTimetableList } from './TimetableCardList';

const Titles = props => {
  const { onClick, lecture } = props;
  const classes = useStyles();

  return useMemo(() => (
    <Container className={classes.row} onClick={onClick}>
      <Box className={classes.title_1}>{lecture.sub_dept}</Box>
      <Box className={classes.title_2}>{lecture.subject_nm}</Box>
      <Box className={classes.title_3}>{lecture.class_div}</Box>
      <Box className={classes.title_4}>{lecture.prof_nm}</Box>
    </Container>
  ), [onClick, lecture]);
};

const Expansion = props => {
  const { lecture, type } = props;
  const classes = useStyles();

  const timetableList = useRecoilValue(timetableListState);
  const currentTimetableIndex = useRecoilValue(currentTimetableIndexState);
  const [, fetchTimetables] = useTimetableList();

  const timetable = timetableList[currentTimetableIndex];

  const addLecture = async () => {
    if (timetable.year !== lecture.year || timetable.term !== lecture.term) {
      alert('추가하려는 강의가 시간표와 학기가 맞지 않아요..');
      return;
    }

    const body = {
      year: timetable.year,
      term: timetable.term,
      lectureId: lecture._id,
      timetableId: timetable._id,
    };

    const response = await requestAPI(API_ADD_TLECTURE(), body);

    if (response.status !== StatusCodes.OK) {
      alert('강의를 추가하는데 실패했어요...');
    }

    fetchTimetables();
  };

  const deleteLecture = async () => {
    const response = await requestAPI(API_DELETE_TLECTURE(), {
      year: timetable.year,
      term: timetable.term,
      tLectureId: lecture._id,
      timetableId: timetable._id,
    });

    if (response.status !== StatusCodes.OK) {
      alert('강의를 버리지 못했어요..');
    }

    fetchTimetables();
  };

  return (
    <Container className={classes.detail}>
      <Box className={classes.detailText}>
        교과구분: {lecture.subject_div}<br />
        강의시간 및 강의실: {lecture.class_nm}<br />
        수강정원: {lecture.tlsn_limit_count}<br />
        학년: {lecture.shyr}<br />
        학점: {lecture.credit}<br />
        수강정원: {lecture.tlsn_limit_count}<br />
        타과허용/복수전공: {lecture.etc_permit_yn}/{lecture.sec_permit_yn}
      </Box>
      {type === 'search'
        ? <Button onClick={addLecture}>추가</Button>
        : <Button onClick={deleteLecture}>삭제</Button>}
    </Container>
  );
};

export default function LectureListItem(props) {
  const {
    type,
    lecture,
    expand,
    setExpandedId,
  } = props;
  const classes = useStyles();
  const setHighlightLecture = useSetRecoilState(highLightLectureState);

  return useMemo(() => (
    <ListItem
      className={classes.root}
      onMouseEnter={() => setHighlightLecture(lecture)}
      onMouseLeave={() => setHighlightLecture(null)}
    >
      <Titles onClick={() => setExpandedId(expand ? null : lecture._id)} lecture={lecture} />
      {expand && <Expansion lecture={lecture} type={type} />}
    </ListItem>
  ), [setHighlightLecture, classes, type, lecture, expand, setExpandedId]);
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '1em',
  },
  detail: {
    display: 'flex',
    width: '100%',
    paddingTop: '1em',
    paddingBottom: '1em',
    borderBottom: '1px solid #EAEAEA',
  },
  detailText: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
  },
  title_1: {
    fontSize: '0.8rem',
    width: '35%',
  },
  title_2: {
    fontSize: '0.8rem',
    width: '35%',
  },
  title_3: {
    fontSize: '0.8rem',
    width: '10%',
  },
  title_4: {
    fontSize: '0.8rem',
    width: '20%',
  },
});
