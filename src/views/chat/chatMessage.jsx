import { Container } from '@material-ui/core';
import React from 'react';

export default function ChatMessage({from, message, readCnt}) {
    return (
        <Container>
            {from}
            {message.content}
            {message.date}
            {readCnt > 0 ? readCnt : null }
        </Container>
    );
}