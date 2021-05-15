import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function TimetableButtonCard({ onClick }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} onClick={onClick}>
      <AddIcon className={classes.icon} />
    </Paper>
  );
}

const useStyles = makeStyles({
  root: {
    flex: '1',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '5em',
  },
});
