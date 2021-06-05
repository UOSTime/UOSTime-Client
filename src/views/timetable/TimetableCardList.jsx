import React from 'react';
import StatusCodes from 'http-status-codes';
import { useRecoilValue } from 'recoil';
import { timetableListState, currentTimetableIndexState } from '@states/Timetable';
import AddIcon from '@material-ui/icons/Add';
import { Box, Button, Icon, makeStyles } from '@material-ui/core';
import { API_CREATE_TIMETABLE, requestAPI } from '@utils/api';
import { useShowPopup } from '@components/Popup';
import TimetableCard from './TimetableCard';

export default function TimetableCardList() {
  const currentTimetableIndex = useRecoilValue(currentTimetableIndexState);
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
