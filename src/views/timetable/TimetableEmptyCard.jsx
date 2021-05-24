import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

export default function TimetableEmptyCard() {
  const classes = useStyles();

  return (
    <Box className={classes.root} />
  );
}

const useStyles = makeStyles({
  root: {
    flex: '1',
    width: '100%',
    cursor: 'unset',
  },
});
