import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { semesterState } from '../states/Semester';
import { userIDState } from '../states/User';
import Header from '../components/Header';
import Login from '@views/login';

const useStyles = makeStyles(theme => ({
  root:{
    height: '100%',
    width: '100%',
  },
}));

export default function Timetable() {
  const classes = useStyles();
  const userID = useRecoilValue(userIDState);
  const [semester, setSemester] = useRecoilState(semesterState);

  if (!userID) {
    return <Login />;
  }

  return (
    <Container className={classes.root}>
      <Header />
      <h1>Timetable</h1>
      <p>Hello, {userID}</p>
      <p>{semester.year}-{semester.term}</p>
    </Container>
  );
}
