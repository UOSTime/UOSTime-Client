import React, { useEffect, useRef } from 'react';
import { Box, Container, Link, Typography } from '@material-ui/core';
import { Redirect } from 'react-router';
import { requestAPI, API_FIND_CHATROOMS, API_GET_MESSAGES } from '../../utils/api';
import { useRecoilState } from 'recoil';
import { chatroomState } from '../../states/Chatroom';
import { StatusCodes } from 'http-status-codes';
import ChatroomList from './chatroomList';
import { getSocket } from '../../utils/socket';

export default function Chatrooms() {
  const [chatrooms, setChatrooms] = useRecoilState(chatroomState);
  const chatroomsRef = useRef([]);
  
  const socket = getSocket();

  const onMessageEvent = (event) => {
    console.log(event)
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
        const res = await requestAPI(API_GET_MESSAGES().setQuery({chatRoomId: room._id, start: -1, end: -1}));
        let topMessage = '';
        if(res.status === StatusCodes.OK && res.data.length === 1) {
          topMessage = res.data[0].content;
        }

        return {
          id: room._id,
          participants: room.participants,
          name: room.name,
          new: 0,
          topMessage: topMessage
        };
      })

      const rooms = await Promise.all(promises);

      console.log(rooms)
      setChatrooms(rooms);
      chatroomsRef.current = rooms;
    };

    getChatrooms();

    socket.on('message', onMessageEvent);
  }, []);

  const onClickRoom = (e) => {
    const chatRoomId = e.target.getAttribute('name');

    const newChatrooms = chatroomsRef.current.map(room => {
      if(room.id === chatRoomId) {
        const newRoom = { ...room };
        newRoom.new = 0;

        return newRoom;
      }
      return room;
    });

    setChatrooms(newChatrooms);
    chatroomsRef.current = newChatrooms;
  }

  if(!window.localStorage.getItem('userID')) {
    return <Redirect to='/login' />;
  }

  return (
    <Container>
        <Typography>채팅방</Typography>
        <ChatroomList rooms={chatrooms} onClick={onClickRoom} />
    </Container>
  );
}