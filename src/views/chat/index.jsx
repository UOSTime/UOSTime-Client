import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import queryString from 'query-string';
import { useRecoilState } from 'recoil';
import { chatroomState } from '../../states/Chatroom';
import { Redirect } from 'react-router';
import { API_GET_MESSAGES, requestAPI } from '../../utils/api';
import { StatusCodes } from 'http-status-codes';
import ChatMessage from './chatMessage';
import { getSocket } from '../../utils/socket';

export default function Chatroom({location}) {
    const [chatroomList, setChatroomList] = useRecoilState(chatroomState);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [readPoints, setReadPoints] = useState([]);
    const [emptyMsg, setEmptyMsg] = useState('');

    const query = queryString.parse(location.search)
    const chatRoom = chatroomList.find(chatroom => chatroom._id === query.id);

    if(!chatRoom) {
        return <Redirect to='/chatrooms' />
    }

    const length = useRef(chatRoom.length);
    const range = useRef({start: 0, end: 0});
    const messageRef = useRef([]);

    const userId = window.localStorage.getItem('userID');
    const socket = getSocket();

    const onMessageEvent = (message) => {
        length.current++;
        range.current.end++;

        setMessages(messageRef.current.concat(message));
        messageRef.current = messageRef.current.concat(message);
    }

    useEffect(() => {
        socket.on('message', onMessageEvent);

        const getMessages = async (chatRoomId, start, end) => {
            const response = await requestAPI(API_GET_MESSAGES().setQuery({chatRoomId, start, end}));

            if(response.status !== StatusCodes.OK) {
                setEmptyMsg('메시지를 불러오는데 실패했습니다.');
                return;
            }
            setMessages(response.data);
            messageRef.current = response.data
        };

        const start = length.current > 50 ? length.current-50 : 0;
        const end = length.current > 0 ? length.current-1 : 0;

        range.current = {start, end};
        length.current = end - start + 1;
        getMessages(chatRoom._id, start, end);
    }, []);
    

    const onChange = ({target}) => {
        setInput(target.value);
    }

    const onEnterPress = (e) => {
        if(e.key == 'Enter') {
            send();
        } 
    }

    const send = () => {
        if(input.length > 0) {
            const messageEvent = {
                chatRoomId: chatRoom._id,
                from: window.localStorage.getItem('userID'),
                type: 'normal',
                content: input
            }

            socket.emit('message', messageEvent);
        }
    }
    
    const messageList = messages.map((m, idx) => {
        const index = range.current.start + idx
        const from = chatRoom.participants.find(p => p._id == m.from).name;
        const readCnt = readPoints.filter(point => point.id !== userId)
                                  .filter(point => point.idx < index)
                                  .length;
        return <ChatMessage key={index} from={from} message={m} readCnt={readCnt} />;
    });
    
    return (
        <Container>
            <Container>
                <Typography variant="h2">{chatRoom.name}</Typography>
                { messageList }
            </Container>
            <Container>
                <input type='text' onChange={onChange} onKeyPress={onEnterPress} />
                <Button onClick={send}>전송</Button>
            </Container>
        </Container>
    );
}