import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

export default function TimetableEmptyCard() {
  const classes = useStyles();

  return (
    <Container className={classes.root} />
  );
}

const useStyles = makeStyles({
  root: {
    flex: '1',
    width: '100%',
    cursor: 'unset',
  },
});
