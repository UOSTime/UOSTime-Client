import React from 'react';
import StatusCodes from 'http-status-codes';
import { useRecoilValue } from 'recoil';
import { timetableListState } from '@states/Timetable';
import { Box, Grid, makeStyles } from '@material-ui/core';
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
    // <TimetableEmptyCard />,
    // <TimetableEmptyCard />,
    // <TimetableEmptyCard />,
  );

  return (
    <Box className={classes.root}>
      {/* {timetableComponents.slice(0, 4)} */}
      {timetableComponents}
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridGap: '0.5em',
    // gridTemplateColumns: 'minmax(15em, 20em)',
    // grid -template-columns: repeat(3, 1fr);
    // grid-template-rows: repeat(3, minmax(100px, auto));
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%',
    margin: '0 -0.5em',
    padding: '0.5em',
    '& > *': {
      // margin: '0.5em',
      gridRow: '1',
      minWidth: '15em',
      // maxWidth: '20em',
    },
    overflowX: 'scroll',
  },
});
