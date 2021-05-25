import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';

export default function TimetableEmptyCard() {
  const classes = useStyles();

  return (
    // <Grid item xs>
    <Box className={classes.root} />
    // {/* </Grid> */}
  );
}

const useStyles = makeStyles({
  root: {
    // flex: '1',
    // height: '100%',
    cursor: 'unset',
  },
});
