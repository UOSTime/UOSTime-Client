import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';

export default function ChatroomList({rooms}) {
  
  return (
    <Container>
      {rooms.map(room => <Chatroom key={room._id} info={room} />)}
    </Container>
  );
}

function Chatroom({info}) {
  const userId = window.localStorage.getItem('userID');
  const participants = info.participants.filter(p => p._id !== userId)
                        .map(p => p.name)
                        .reduce((acc, cur) => acc + ' ' + cur);

  return (
      <Link to={`/chat?id=${info._id}`}>
        <Container>
          <Typography>{ info.name }</Typography>
          <Typography>{ participants }</Typography>
        </Container>
      </Link>
  );
}