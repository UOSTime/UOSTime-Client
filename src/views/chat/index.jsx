import React from 'react';
import { Container, Typography } from '@material-ui/core';
import queryString from 'query-string';
import Chatroom from './chatroom';

export default function ChatroomPage({location, history}) {

    const chatRoomId = queryString.parse(location.search).id;

    const returnToList = () => {
        history.push('/chatrooms');
    }

    return (
        <Container>
            <button onClick={returnToList}>채팅방 목록</button>
            <Chatroom id={chatRoomId} />
        </Container>
    )
}