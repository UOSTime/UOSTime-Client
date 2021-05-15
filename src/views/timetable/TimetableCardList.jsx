import React from 'react';
import StatusCodes from 'http-status-codes';
import { useRecoilValue } from 'recoil';
import { timetableListState } from '@states/Timetable';
import { Box, makeStyles } from '@material-ui/core';
import { API_CREATE_TIMETABLE, requestAPI } from '@utils/api';
import { useShowPopup } from '@components/Popup';
import TimetableCard from './TimetableCard';
import TimetableButtonCard from './TimetableButtonCard';
import TimetableEmptyCard from './TimetableEmptyCard';

export default function TimetableCardList() {
  const timetableList = useRecoilValue(timetableListState);
  const classes = useStyles();

  const onCreate = async () => {
    const body = {
      year: 2021,
      term: 'A10',
      name: '시간표',
    };

    const response = await requestAPI(API_CREATE_TIMETABLE(), body);

    if (response.status !== StatusCodes.CREATED) {
      useShowPopup('시간표 생성에 실패했어요...');
    }

    // TODO: request updated list
  };

  const timetableComponents = (timetableList || []).map((timetable, i) => (
    <TimetableCard key={timetable._id} index={i} timetable={timetable} />
  ));
  timetableComponents.push(
    <TimetableButtonCard onClick={onCreate} />,
    <TimetableEmptyCard />,
    <TimetableEmptyCard />,
    <TimetableEmptyCard />,
  );

  return (
    <Box className={classes.root}>
      {timetableComponents.slice(0, 4)}
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& > *': {
      margin: '0.5em 0',
    },
  },
});
