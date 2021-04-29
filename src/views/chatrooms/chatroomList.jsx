import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@material-ui/core';

export default function ChatroomList({rooms, onClick}) {
  
  return (
    <Container>
      {rooms.map(room => <Chatroom key={room.id} info={room} onClick={onClick} />)}
    </Container>
  );
}

function Chatroom({info, onClick}) {
  const userId = window.localStorage.getItem('userID');
  const participants = info.participants.filter(p => p._id !== userId)
                        .map(p => p.name)
                        .reduce((acc, cur) => acc + ' ' + cur);

  return (
      <Link name={info.id} to={`/chat?id=${info.id}`} onClick={onClick}>
        <Container>
          <Typography>{ info.name }</Typography>
          <Typography>{ participants }</Typography>
          <Box>
            <Typography>{ info.topMessage }</Typography>
            <Typography>{ info.new > 0 ? info.new : null }</Typography>
          </Box>
        </Container>
      </Link>
  );
}