import React, { useEffect, useState } from 'react';
import { Box, Container, Link, Typography } from '@material-ui/core';
import { Redirect } from 'react-router';
import { requestAPI, API_FIND_CHATROOMS } from '../../utils/api';
import { useRecoilState } from 'recoil';
import { chatroomState } from '../../states/Chatroom';
import { StatusCodes } from 'http-status-codes';
import ChatroomList from './chatroomList';
import { getSocket } from '../../utils/socket';

export default function Chatrooms() {
  const [chatrooms, setChatrooms] = useRecoilState(chatroomState);
  
  useEffect(() => {
    const getChatrooms = async () => {
      const response = await requestAPI(API_FIND_CHATROOMS());
      
      if(response?.status !== StatusCodes.OK) {
        alert(response.data.message);
        return;
      }
      setChatrooms(response.data);
    };

    getChatrooms();
  }, []);

  if(!window.localStorage.getItem('userID')) {
    return <Redirect to='/login' />;
  }
  const socket = getSocket();

  return (
    <Container>
        <Typography>채팅방</Typography>
        <ChatroomList rooms={chatrooms} />
    </Container>
  );
}