import React from 'react';
import StatusCodes from 'http-status-codes';
import { useRecoilState, useRecoilValue } from 'recoil';
import AddIcon from '@material-ui/icons/Add';
import { Box, Button, makeStyles } from '@material-ui/core';
import { semesterState } from '@states/Semester';
import { timetableListState, currentTimetableIndexState } from '@states/Timetable';
import { requestAPI, API_GET_TIMETABLES, API_CREATE_TIMETABLE } from '@utils/api';
import TimetableCard from './TimetableCard';

export function useTimetableList() {
  const selectedSemester = useRecoilValue(semesterState);
  const [timetableList, setTimetableList] = useRecoilState(timetableListState);
  const [
    currentTimetableIndex,
    setCurrentTimetableIndex,
  ] = useRecoilState(currentTimetableIndexState);

  const fetchTimetables = async () => {
    const response = await requestAPI(API_GET_TIMETABLES(selectedSemester));

    if (!response || response.status !== StatusCodes.OK) {
      alert('시간표를 가져오는데 실패했어요');
      return;
    }

    const timetables = response.data;
    setTimetableList(timetables);
    if (currentTimetableIndex >= timetables.length) {
      setCurrentTimetableIndex(0);
    }
  };

  const TimetableList = () => {
    const classes = useStyles();

    const onCreate = async () => {
      const response = await requestAPI(API_CREATE_TIMETABLE({
        ...selectedSemester,
        name: '시간표',
      }));

      if (response.status !== StatusCodes.CREATED) {
        alert('시간표 생성에 실패했어요...');
      }

      fetchTimetables();

      // setCurrentTimetableIndex(timetableList.length);
    };

    const timetableCards = (timetableList || []).map((timetable, i) => (
      i !== currentTimetableIndex
      && (
        <TimetableCard key={String(timetable._id + i)} index={i} timetable={timetable} />
      )));

    return (
      <>
        <Button
          // variant="contained"
          // color="primary"
          className={classes.button}
          endIcon={<AddIcon />}
          onClick={onCreate}
        />
        <Box className={classes.root}>
          {timetableCards}
        </Box>
      </>
    );
  };

  return [TimetableList, fetchTimetables];
}

export default function TimetableCardList() {
  const [TimetableList] = useTimetableList();
  return <TimetableList />;
}

const useStyles = makeStyles({
  root: {
    display: 'grid',
    margin: '1em -1em -1em -1em',
    padding: '0 1em',
    overflowY: 'hidden',

    '&:hover': {
      paddingBottom: '1em',
    },

    '& > *': {
      gridColumn: '1',
      transition: 'margin 0.15s, color 0.15s',
      '& .timetable-card-title': {
        transition: 'margin 0.15s ease',
      },
    },
    '&:not(:hover) > *': {
      '&:not(:first-child)': {
        marginTop: '-1em',
      },
      '& .timetable-card-title': {
        margin: '-0.5em 0',
      },
    },
  },
});
