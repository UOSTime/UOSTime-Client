import React from 'react';
import { useSetRecoilState } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import {
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { currentTimetableIndexState } from '@states/Timetable';
import { requestAPI, API_DELETE_TIMETABLE } from '@utils/api';
import { useTimetableList } from './TimetableCardList';

export default function TimetableCard({ index, timetable }) {
  const setCurrentTimetableIndex = useSetRecoilState(currentTimetableIndexState);
  const [, fetchTimetables] = useTimetableList();

  const classes = useStyles();

  const onClick = () => {
    setCurrentTimetableIndex(index);
  };

  const onDelete = async () => {
    const response = await requestAPI(API_DELETE_TIMETABLE()
      .setQuery({ year: 2021, term: 'A10' })
      .setPath(timetable._id));

    if (response.status !== StatusCodes.NO_CONTENT) {
      alert('시간표를 삭제하지 못했어요...');
    }

    fetchTimetables();
  };

  return (
    <Paper className={classes.root} onClick={onClick}>
      <CloseIcon aria-label="delete" className={classes.deleteBtn} onClick={onDelete} />
      <Typography className="timetable-card-title">{timetable.name || 'Name'}</Typography>
    </Paper>
  );
}

const useStyles = makeStyles({
  root: {
    borderTopLeftRadius: '1em',
    borderTopRightRadius: '1em',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
    border: '1px solid #F0F0F0',
    overflow: 'hidden',
    cursor: 'pointer',
    padding: '1em 1em 2em 1em',
    marginBottom: '-1em',
    position: 'relative',
    transition: 'color 0.5s',
    color: '#A0A0A0',
    '&:hover': {
      color: '#313131',
    },
  },
  deleteBtn: {
    position: 'absolute',
    top: '0.5em',
    right: '0.5em',
    '$root:not(:hover) &': {
      display: 'none',
    },
  },
});
