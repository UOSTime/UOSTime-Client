import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import {
  Box,
  Button,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { currentTimetableIndexState } from '@states/Timetable';
import { requestAPI, API_DELETE_TIMETABLE } from '@utils/api';
import LectureList from './LectureList';

export default function TimetableCard({ index, timetable }) {
  const [currentTimetableIndex, setCurrentTimetableIndex] = useRecoilState(currentTimetableIndexState);
  const [showList, setShowList] = useState(false);
  const isSelected = index === currentTimetableIndex;

  const classes = useStyles();

  const totalCredits = timetable.tlecture_list
    .map(tlecture => tlecture.lecture.credit)
    .reduce((acc, cur) => acc + cur, 0);

  let majorCredit = 0;
  let cultureCredit = 0;
  let majorCnt = 0;
  let cultureCnt = 0;
  timetable.tlecture_list
    .map(t => t.lecture)
    .forEach(lecture => {
      const div = lecture.subject_div.substring(0, 2);
      if (div === '교양') {
        cultureCnt++;
        cultureCredit += lecture.credit;
      } else if (div === '전공') {
        majorCnt++;
        majorCredit += lecture.credit;
      }
    });

  const onClick = () => {
    setCurrentTimetableIndex(index);
  };

  const onDelete = async () => {
    const response = await requestAPI(API_DELETE_TIMETABLE({ year: 2021, term: 'A10' })
      .setPath(timetable._id));

    if (response.status !== StatusCodes.NO_CONTENT) {
      alert('시간표를 삭제하지 못했어요...');
    }
  };

  return (
    <Paper className={classes.root} onClick={onClick}>
      <Box className={classes.innerRoot}>
        <CloseIcon aria-label="delete" className={classes.deleteBtn} onClick={onDelete} />
        <Typography>{timetable.name || 'Name'}</Typography>
        <Typography className={classes.credit}>
          {totalCredits}학점<br />
          {/* 전공 {majorCredit}학점({majorCnt}과목)
          교양 {cultureCredit}학점({cultureCnt}과목) */}
        </Typography>
      </Box>
      {isSelected && (
        <>
          <Button className={classes.showListButton} onClick={() => setShowList(!showList)}>
            {showList ? '강의목록 숨기기' : '강의목록 펼치기'}
          </Button>
          {showList && (
            <LectureList
              lectureList={timetable.tlecture_list.map(tlecture => tlecture.lecture)}
              emptyText="(빈 시간표)"
              // scrollList
            />
          )}
        </>
      )}
    </Paper>
  );
}

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
    width: '100%',
    padding: '1em',
  },
  innerRoot: {
    position: 'relative',
  },
  deleteBtn: {
    position: 'absolute',
    top: '0',
    right: '0',
    '$root:not(:hover) &': {
      display: 'none',
    },
  },
  credit: {
    fontSize: '90%',
    color: '#afafaf',
  },
  showListButton: {
    margin: '0.5em 0',
  },
});
