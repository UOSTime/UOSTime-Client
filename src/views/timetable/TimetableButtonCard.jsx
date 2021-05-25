import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function TimetableButtonCard({ onClick }) {
  const classes = useStyles();

  return (
    // <Grid item xs>
    <Paper className={classes.root} onClick={onClick}>
      <AddIcon className={classes.icon} />
    </Paper>
    // </Grid>
  );
}

const useStyles = makeStyles({
  root: {
    // flex: '1',
    // height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  icon: {
    margin: 'auto',
    fontSize: '2em',
  },
});
