import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import { Box, Button, Container, InputBase, makeStyles, Paper, Typography } from '@material-ui/core';
import { timetableListState, currentTimetableIndexState, showNightTimesState, showSaturdayState, timeFormatState } from '@states/Timetable';
import { highLightLectureState } from '@states/Lecture';
import { lectureToTime, days, times } from '@utils/timetable';
import { requestAPI, API_DELETE_TLECTURE, API_PATCH_TIMETABLE_NAME } from '@utils/api';
import { getFormattedHour } from '@utils/time';
import SettingDialog from './SettingDialog';
import ShareDialog from './ShareDialog';
import { useTimetableList } from './TimetableCardList';

export const TimetableElementID = 'timetable';

export default function Timetable() {
  const [timetableList, setTimetableList] = useRecoilState(timetableListState);
  const currentTimetableIndex = useRecoilValue(currentTimetableIndexState);
  const highlightLecture = useRecoilValue(highLightLectureState);

  // settings
  const timeFormat = useRecoilValue(timeFormatState);
  const showNightTimes = useRecoilValue(showNightTimesState);
  const showSaturday = useRecoilValue(showSaturdayState);

  const [, fetchTimetables] = useTimetableList();
  const [isOpenSettingDialog, setIsOpenSettingDialog] = useState(false);
  const [isOpenShareDialog, setIsOpenShareDialog] = useState(false);

  const timetable = timetableList[currentTimetableIndex];

  const classes = useStyles();
  const colorClass = useLectureColor();
  const sizeClass = useLectureSize();

  const lectureList = timetable.tlecture_list
    .map(tlecture => tlecture.lecture)
    .filter(lecture => lecture.class_nm !== '')
    .map((lecture, idx) => lectureToTime(lecture, idx))
    .flat();

  const timetableMap = times.map(() => Array(days.length).fill(null));
  lectureList.forEach(lecture => {
    const row = lecture.hours[0] - 1;
    const col = lecture.day;

    timetableMap[row][col] = lecture;
  });

  const onDelete = async ({ target }) => {
    const lectureId = target.getAttribute('name');
    const tlecture = timetable.tlecture_list.find(t => t.lecture._id === lectureId);

    if (!tlecture) {
      alert('이미 삭제된 강의입니다.');
      return;
    }
    const tlectureId = tlecture._id;

    const response = await requestAPI(API_DELETE_TLECTURE({
      year: 2021,
      term: 'A10',
      tLectureId: tlectureId,
      timetableId: timetable._id,
    }));

    if (response.status !== StatusCodes.OK) {
      alert('강의를 삭제하지 못했어요...');
    }

    fetchTimetables();
  };

  const onChangeNameField = ({ target }) => {
    const name = target.value;
    timetable.name = name;
    setTimetableList(timetableList);
    onSubmitName();
  };

  const onSubmitName = async () => {
    const response = await requestAPI(API_PATCH_TIMETABLE_NAME({
      year: timetable.year,
      term: timetable.term,
      name: timetable.name,
      timetableId: timetable._id,
    }));

    if (response.status !== StatusCodes.OK) {
      alert('시간표 명을 변경하지 못 했어요...');
    }

    fetchTimetables();
  };

  const highlightables = lectureToTime(highlightLecture).filter(h => h?.hours && h.day);

  const HighlightBox = ({ r, c }) => (
    <LectureBox
      isHighlight
      lecture={
        highlightables.filter(({ hours, day }) => (
          r === hours[0] - 1 && c === day))[0]
      }
    />
  );

  const LectureBox = ({ lecture, isHighlight = false }) => {
    if (!lecture) return null;

    const { id, name, place, color, hours } = lecture;
    return (
      <Box
        className={[
          classes.lectureBox,
          sizeClass[hours.length],
          isHighlight ? classes.highlightLectureBox : '',
        ].join(' ')}
      >
        <Box className={[
          classes.innerLectureBox,
          colorClass[color],
        ].join(' ')}
        >
          {!isHighlight && (
            <>
              <button
                type="button"
                name={id}
                className={classes.deleteBtn}
                onClick={onDelete}
              >
                ×
              </button>
              <Typography className={classes.lectureBoxName}>{name}</Typography>
              <Typography className={classes.lectureBoxPlace}>{place}</Typography>
            </>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Paper className={classes.root}>
      <Box className={classes.topbar}>
        <InputBase
          onChange={onChangeNameField}
          defaultValue={timetable.name}
          className={classes.timetableNameInput}
          placeholder="Timetable Name"
        />
        {/* <Button onClick={onSubmitName}>변경</Button> */}
        <Button onClick={() => setIsOpenSettingDialog(true)}>설정</Button>
        <Button onClick={() => setIsOpenShareDialog(true)}>공유</Button>
      </Box>
      <Box id={TimetableElementID} className={classes.timetable}>
        <Box className={classes.dayContainer}>
          <Box className={classes.timeBox} />
          {days.slice(0, showSaturday ? 6 : 5).map((day, i) => (
            <Box key={day} className={classes.dayBox} data-day={i}>{day}</Box>
          ))}
        </Box>
        <Container className={classes.timeContainer}>
          {times.map((time, r) => {
            if (time >= 18 && !showNightTimes) {
              return null;
            }

            return (
              <Container key={r.toString()} className={classes.rowContainer}>
                <Box className={classes.timeBox}>
                  <Typography>{getFormattedHour(time, timeFormat)}</Typography>
                </Box>
                {days.slice(0, showSaturday ? 6 : 5).map((_, c) => (
                  <Box
                    key={c.toString()}
                    className={classes.box}
                    data-day={c}
                  >
                    <LectureBox lecture={timetableMap[r][c]} />
                    <HighlightBox r={r} c={c} />
                  </Box>
                ))}
              </Container>
            );
          })}
        </Container>
      </Box>
      <SettingDialog
        open={isOpenSettingDialog}
        onClose={() => setIsOpenSettingDialog(false)}
      />
      <ShareDialog
        open={isOpenShareDialog}
        onClose={() => setIsOpenShareDialog(false)}
      />
    </Paper>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    borderRadius: '1em',
    overflow: 'hidden',
    border: '1px solid #F0F0F0',
  },
  timetable: {
    backgroundColor: '#FFFFFF',
  },
  timeContainer: {
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    alignContent: 'stretch',
  },
  topbar: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0.5em 1em',
  },
  timetableNameInput: {
    flexGrow: '1',
  },
  dayContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0.5em 0',
    margin: '0.5em 0',
    borderBottom: '1px solid #EAEAEA',
  },
  rowContainer: {
    borderBottom: '1px solid #FFFFFF',
    minHeight: '3.5em',
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    padding: '0',
  },
  box: {
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeBox: {
    width: '3em',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBox: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  lectureBox: {
    position: 'absolute',
    padding: '0.2em',
    zIndex: '10',
    width: '100%',
  },
  highlightLectureBox: {
    zIndex: '12',
  },
  innerLectureBox: {
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    width: '100%',
  },
  lectureBoxName: {
    fontSize: 'small',
  },
  lectureBoxPlace: {
    fontSize: 'small',
  },
  deleteBtn: {
    cursor: 'pointer',
    width: '1em',
    height: '1em',
    lineHeight: '0rem',
    textAlign: 'center',
    position: 'absolute',
    fontWeight: '700',
    fontSize: '1rem',
    zIndex: '11',
    top: '0.5em',
    right: '0.5em',
    padding: '0',
    margin: '0',
    background: 'none',
    color: '#000000',
    border: 'none',
    opacity: '0.3',
    '&:hover': {
      opacity: '0.7',
    },
    '&:focus': {
      outline: 'none',
    },
    '$lectureBox:not(:hover) &': {
      display: 'none',
    },
  },
});

const useLectureColor = makeStyles({
  0: { backgroundColor: '#9ede73' },
  1: { backgroundColor: '#5CA4A9' },
  2: { backgroundColor: '#E6EBE0' },
  3: { backgroundColor: '#F1AE8B' },
  4: { backgroundColor: '#ED6A5A' },
  5: { backgroundColor: '#ffc2b4' },
  6: { backgroundColor: '#d5ecc2' },
  7: { backgroundColor: '#ff8303' },
  8: { backgroundColor: '#bdc7c9' },
  9: { backgroundColor: '#845460' },
  10: { backgroundColor: '#000000' },
  preview: {
    backgroundColor: 'gray',
    opacity: 0.3,
  },
});

const useLectureSize = makeStyles({
  1: { height: '100%' },
  2: { height: '200%' },
  3: { height: '300%' },
  4: { height: '400%' },
  5: { height: '500%' },
  6: { height: '600%' },
  7: { height: '700%' },
  8: { height: '800%' },
  9: { height: '900%' },
  10: { height: '1000%' },
});
