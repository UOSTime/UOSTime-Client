import React from 'react';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import queryString from 'query-string';
import Chatroom from './chatroom';

export default function ChatroomPage({ location, history }) {
  const chatRoomId = queryString.parse(location.search).id;
  const classes = useStyles();

  const returnToList = () => {
    history.push('/chatrooms');
  };

  return (
    <Container className={classes.root}>
      <Chatroom id={chatRoomId} />
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '0',
  },
  backBtn: {},
});
