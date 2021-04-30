import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';
import { API_FIND_CHATROOM, API_GET_MESSAGES, API_GET_POINTS, requestAPI } from '../../utils/api';
import { StatusCodes } from 'http-status-codes';
import ChatMessage from './chatMessage';
import { getSocket } from '../../utils/socket';
import { Redirect } from 'react-router';

export default function Chatroom({id}) {
    const [chatRoom, setChatRoom] = useState({});
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [readPoints, setReadPoints] = useState([]);
    const [emptyMsg, setEmptyMsg] = useState('');

    const chatRoomId = id;

    const range = useRef({start: 0, end: 0});
    const messageRef = useRef([]);
    const readPointRef = useRef([]);
    const chatRoomRef = useRef({});

    const userId = window.localStorage.getItem('userID');

    if(!userId) {
        return <Redirect to='/login' />;
    }
    const socket = getSocket();

    const onMessageEvent = (message) => {
        const newChatRoom = {
            ...chatRoomRef.current,
            length: length+1
        };
        setChatRoom(newChatRoom);
        chatRoomRef.current = newChatRoom;
        range.current.end++;

        let newMessages;
        if(message.from === userId) {
            newMessages = messageRef.current.map(m => {
                if(m.id === message.id) {
                    return message;
                }
                return m;
            })
        } else {
            newMessages = messageRef.current.concat(message);
        }

        setMessages(newMessages);
        messageRef.current = newMessages;

        socket.emit('read', {
            chatRoomId: chatRoomId,
            userId: userId,
            messageIdx: range.current.end
        });
    };

    const onReadEvent = (read) => {
        const updatedReadPoints = readPointRef.current.map(point => {
            if(point.id === read.userId) {
                return {
                    ...point,
                    read: read.messageIdx
                };
            }   
            return point;
        });
        
        setReadPoints(updatedReadPoints);
        readPointRef.current = updatedReadPoints;
    };

    useEffect(() => {
        socket.on('message', onMessageEvent);
        socket.on('read', onReadEvent);

        const getChatRoom = async (chatRoomId) => {
            const response = await requestAPI(API_FIND_CHATROOM().setPathParam(chatRoomId));

            if(response.status !== StatusCodes.OK) {
                setEmptyMsg('데이터를 불러오는데 실패했습니다.');
                
                history.push('/chatrooms');
                
                throw new Error();
            }

            setChatRoom(response.data);
            chatRoomRef.current = response.data;

            return response.data;
        }

        const getMessages = async (chatRoomId, start, end) => {
            if(end < 0) return;

            const response = await requestAPI(API_GET_MESSAGES().setQuery({chatRoomId, start, end}));

            if(response.status !== StatusCodes.OK) {
                setEmptyMsg('채팅을 불러오는데 실패했습니다.');
                return;
            }
            setMessages(response.data);
            messageRef.current = response.data;
        };

        const getReadPoints = async (chatRoomId) => {
            const response = await requestAPI(API_GET_POINTS().setQuery({chatRoomId}));

            if(response.status !== StatusCodes.OK) {
                setEmptyMsg('데이터를 불러오는데 실패했습니다.');
                return;
            }
            setReadPoints(response.data);
            readPointRef.current = response.data;
        }

        getChatRoom(chatRoomId).then((room) => {
            const start = room.length > 50 ? room.length-50 : 0;
            const end = room.length > 0 ? room.length-1 : 0;

            range.current = {start, end};

            getMessages(chatRoomId, start, end);
            getReadPoints(chatRoomId);
    
            socket.emit('read', {
                chatRoomId: chatRoomId,
                userId: userId,
                messageIdx: range.current.end
            });
        })
        .catch(() => {});

        return () => {
            socket.off('read');
            socket.off('message');
        }
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
            const id = uuidv4();

            const messageEvent = {
                id,
                chatRoomId: chatRoom._id,
                from: window.localStorage.getItem('userID'),
                type: 'normal',
                content: input
            }

            socket.emit('message', messageEvent);

            const newMessages = messageRef.current.concat(messageEvent);
            setMessages(newMessages);
            messageRef.current = newMessages;

            setInput('');
        }

    }
    
    const messageList = messages.map((m, idx) => {
        const index = range.current.start + idx;
        const from = chatRoom.participants.find(p => p._id === m.from).name;
        const readCnt = readPoints.filter(point => point.id !== userId)
                                  .filter(point => point.id !== m.from)
                                  .filter(point => point.read < index)
                                  .length;
        return <ChatMessage key={index} from={from} message={m} readCnt={readCnt} idx={index} />;
    });
    
    return (
        <Container>
            <Container>
                <Typography variant="h2">{chatRoom.name}</Typography>
                { messageList.length > 0 ? messageList : <Typography>{emptyMsg}</Typography> }
            </Container>
            <Container>
                <input type='text' value={input} onChange={onChange} onKeyPress={onEnterPress} />
                <Button onClick={send}>전송</Button>
            </Container>
        </Container>
    );
}