import React, { useEffect, useRef, useState } from 'react';
import ContentEditable from "react-contenteditable";
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { API_FIND_CHATROOM, API_GET_MESSAGES, API_GET_POINTS, requestAPI } from '../../utils/api';
import { StatusCodes } from 'http-status-codes';
import ChatMessage from './chatMessage';
import { getSocket } from '../../utils/socket';
import { Redirect } from 'react-router';
import { uosYellow } from '@utils/styles/Colors';
import UserInfoDialog from '../../components/UserInfoDialog';

export default function Chatroom({id}) {
    const [chatRoom, setChatRoom] = useState({});
    const [messages, setMessages] = useState([]);
    const [readPoints, setReadPoints] = useState([]);
    const [emptyMsg, setEmptyMsg] = useState('');
    const [input, setInput] = useState('');

    const classes = useStyles();

    const range = useRef({start: 0, end: 0});
    const messageRef = useRef([]);
    const readPointRef = useRef([]);
    const chatRoomRef = useRef({});
    const editableRef = useRef();
    const sendBtnRef = useRef();
    
    const userId = window.localStorage.getItem('userID');
    
    if(!userId) {
        return <Redirect to='/login' />;
    }
    const chatRoomId = id;
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
    
    const onPaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        document.execCommand("insertText", false, text);
    }

    const onChange = (e) => {
        setInput(e.target.value);
    }

    const onEnterPress = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            sendBtnRef.current.click();
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
    
    let previous = '';
    const messageList = messages.map((m, idx) => {
        const index = range.current.start + idx;
        const from = chatRoom.participants.find(p => p._id === m.from).name;
        const readCnt = readPoints.filter(point => point.id !== userId)
                                  .filter(point => point.id !== m.from)
                                  .filter(point => point.read < index)
                                  .length;
        const isMine = m.from === userId;

        let isSeq = true;
        if(previous !== m.from) {
            previous = m.from;
            isSeq = false;
        }

        return <ChatMessage key={index} from={from} message={m} readCnt={readCnt} isMine={isMine} isSeq={isSeq} />;
    });

    return (
        <Container>
            <Typography variant="h2">{chatRoom.name}</Typography>
            <Container className={classes.msgContainer}>
                { messageList.length > 0 ? messageList : <Typography>{emptyMsg}</Typography> }
                <Container className={classes.inputContainer}>
                <ContentEditable
                    className={classes.input}
                    innerRef={editableRef}
                    tagName="div"
                    html={input}
                    onPaste={onPaste}
                    onChange={onChange}
                    onKeyPress={onEnterPress}
                />
                    <Button className={classes.sendBtn} onClick={send} ref={sendBtnRef}>전송</Button>
                </Container>
            </Container>
            <UserInfoDialog />
        </Container>
    );
}

const useStyles = makeStyles({
    
    msgContainer: {
        margin: '0px',
        padding: '0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    inputContainer: {
        display: 'flex',
        padding: '5px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        maxWidth: '90%',
        minHeight: '2rem',
        maxHeight: '10rem',
        display: 'inline-block',
        overflow: 'auto',
        padding: '3px 12px 3px 12px',
        flexGrow: 1,
        border: '2px solid #D3D3D3',
        borderRadius: '15px',
        overflowWrap: 'break-word',
        '&:focus': {
            outline: 'none',
            border: `3px solid ${uosYellow}`,
        }
    },
    sendBtn: {
        width: '10%',
        height: '100%'
    }
})