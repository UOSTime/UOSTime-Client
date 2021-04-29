import { Container } from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';

export default function ChatMessage({idx, from, message, readCnt}) {
    const time = dayjs(message.date).format('HH:mm')
    return (
        <Container>
            {from}
            {message.content}
            {time}
            {readCnt > 0 ? readCnt : null }
        </Container>
    );
}