import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { backgroundColor } from '@utils/styles/Colors';
import { useRecoilState } from 'recoil';
import { chatroomState } from '../../states/Chatroom';
import userIcon from '@img/fontawesome/chat-user.svg';
import usersIcon from '@img/fontawesome/chat-users.svg';

export default function ChatroomList({rooms, onClick}) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {rooms.map(room => <Chatroom key={room.id} info={room} onClick={onClick} />)}
    </Container>
  );
}

function Chatroom({info}) {
  const [chatrooms, setChatrooms] = useRecoilState(chatroomState);
  const history = useHistory();

  const classes = useChatroomStyles();

  const userId = window.localStorage.getItem('userID');
  const participants = info.participants.find(p => p._id !== userId).name 
                        + (info.participants.length > 2 ? ` 외 ${info.participants.length-2}명` : '');                        

  const onClick = (e) => {
    const chatRoomId = e.target.getAttribute('name');

    const newChatrooms = chatrooms.map(room => {
      if(room.id === chatRoomId) {
        const newRoom = { ...room };
        newRoom.new = 0;

        return newRoom;
      }
      return room;
    });

    setChatrooms(newChatrooms);

    history.push(`/chat?id=${info.id}`);
  }
                      

  return (
    <Container className={classes.root} onClick={onClick}>
      <img className={classes.img} src={info.participants.length > 2 ? usersIcon : userIcon} />
      <Container className={classes.body}>
        <Container className={classes.title}>
          <Typography className={classes.name}>{ info.name }</Typography>
          <Typography className={classes.participants}>{ participants }</Typography>
        </Container>
        <Container className={classes.contents}>
          <Typography className={classes.topMessage}>
            { info.topMessage }
          </Typography>
          { info.new > 0 ? <Box className={classes.newCnt}>{info.new}</Box> : null }
        </Container>
      </Container>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '0'
  }
});

const useChatroomStyles = makeStyles({
  root: {
    width: '100%',
    height: '70px',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#DFDFDF'
    },
    '&:active': {
      backgroundColor: '#C0C0C0'
    }
  },
  img: {
    width: '40px',
    height: '40px',
    marginLeft: '5px'
  },
  body: {
    padding: '0px 5px 0px 10px'
  },
  title: {
    display: 'flex',
    marginBottom: '4px',
    padding: '0',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    height: '1.2rem',
    fontWeight: '700',
    fontSize: '1rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  participants: {
    fontSize: '0.6rem',
    whiteSpace: 'nowrap',
    margin: '0px 5px 0px 5px'
  },
  contents: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0',
  },
  newCnt: {
    minWidth: '1rem',
    height: '1rem',
    padding: '0px 3px 0px 3px',
    display: 'inline-block',
    backgroundColor: 'rgb(255, 74, 47)',
    color: backgroundColor,
    borderRadius: '10px',
    lineHeight: '1rem',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: '700',
    fontSize: '0.7rem',
    whiteSpace: 'nowrap'
  },
  topMessage: {
    width: '85%',
    height: '1rem',
    lineHeight: '100%',
    verticalAlign: 'middle',
    color: 'gray',
    fontSize: '0.8rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
})