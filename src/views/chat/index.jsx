import React, { Suspense } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Loading from '../../components/Loading';
import Chatroom from './chatroom';

export default function ChatroomPage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Suspense fallback={<Loading />}>
        <Chatroom />
      </Suspense>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '0',
  },
  backBtn: {},
});
