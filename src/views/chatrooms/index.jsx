import React, { useEffect, useRef } from 'react';
import { Box, Container, Link, makeStyles, Typography } from '@material-ui/core';
import { Redirect } from 'react-router';
import { requestAPI, API_FIND_CHATROOMS, API_GET_MESSAGES, API_GET_POINTS } from '../../utils/api';
import { useRecoilState } from 'recoil';
import { chatroomState } from '../../states/Chatroom';
import { StatusCodes } from 'http-status-codes';
import ChatroomList from './chatroomList';
import { getSocket } from '../../utils/socket';

export default function Chatrooms() {
  const [chatrooms, setChatrooms] = useRecoilState(chatroomState);
  const chatroomsRef = useRef([]);
  
  const classes = useStyles();

  const userId = window.localStorage.getItem('userID');

  const socket = getSocket();

  const onMessageEvent = (event) => {
    const newChatrooms = chatroomsRef.current.map(room => {
      if(room.id === event.chatRoom) {
        const newRoom = { ...room };
        newRoom.new = room.new + 1;
        newRoom.topMessage = event.content;

        return newRoom;
      }
      return room;
    });

    setChatrooms(newChatrooms);
    chatroomsRef.current = newChatrooms;
  }

  useEffect(() => {
    const getChatrooms = async () => {
      const response = await requestAPI(API_FIND_CHATROOMS());
      
      if(response?.status !== StatusCodes.OK) {
        alert(response.data.message);
        return;
      }

      const promises = response.data.map(async room => {
        const topMsgRes = await requestAPI(API_GET_MESSAGES().setQuery({chatRoomId: room._id, start: -1, end: -1}));

        let topMessage = '';
        if(topMsgRes.status === StatusCodes.OK && topMsgRes.data.length === 1) {
          topMessage = topMsgRes.data[0].content;
        }

        const readRes = await requestAPI(API_GET_POINTS().setQuery({chatRoomId: room._id}));

        let newCnt = 0;
        if(readRes.status === StatusCodes.OK) {
          const cur = readRes.data.find(user => user.id === userId)?.read;
          newCnt = (room.length - 1) - cur;
        }

        return {
          id: room._id,
          participants: room.participants,
          name: room.name,
          new: newCnt,
          topMessage: topMessage
        };
      })

      const rooms = await Promise.all(promises);

      setChatrooms(rooms);
      chatroomsRef.current = rooms;
    };

    getChatrooms();

    socket.on('message', onMessageEvent);
  }, []);

  if(!window.localStorage.getItem('userID')) {
    return <Redirect to='/login' />;
  }

  return (
    <Container className={classes.root}>
        <Typography className={classes.title}>채팅</Typography>
        <ChatroomList rooms={chatrooms} />
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    overflow: 'auto',
    margin: '15px 0px 15px 0px',
    padding: '0'
    // padding: '0px 10px 0px 10px'
  },
  title: {
    marginLeft: '5px',
    fontWeight: '800',
    fontSize: '1.5rem'
  },
});