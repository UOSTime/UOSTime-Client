import React, { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import useInput from '@hooks/useInput';
import { v4 as uuidv4 } from 'uuid';
import usersIcon from '@img/fontawesome/chat-users.svg';
import userIcon from '@img/fontawesome/chat-user.svg';
import { StatusCodes } from 'http-status-codes';
import { uosYellow } from '@utils/styles/Colors';
import ChatMessage from './chatMessage';
import { API_GET_MESSAGES, requestAPI } from '../../utils/api';
import { getSocket } from '../../utils/socket';
import UserInfoDialog from '../../components/UserInfoDialog';
import RoomInfoMenu from './RoomInfoMenu';
import MainMenu from './MainMenu';
import { currentChatRoom } from '../../states/Chatroom';

export default function Chatroom() {
  const { chatRoomId } = useParams();
  const { chatRoom: initChatRoom, messages: initMessages } = useRecoilValue(
    currentChatRoom(chatRoomId),
  );
  const [messages, setMessages] = useState(initMessages);
  const [chatRoom, setChatRoom] = useState(initChatRoom);
  const [readPoints, setReadPoints] = useState([]);
  const [emptyMsg, setEmptyMsg] = useState('');
  const [infoOpen, setInfoOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);
  const [input, handleInput, setInput] = useInput('');

  const classes = useStyles();

  const range = useRef({ start: 0, end: 0 });
  const messageRef = useRef([]);
  const readPointRef = useRef([]);
  const chatRoomRef = useRef({});
  const previousHeightRef = useRef({});
  const sendRef = useRef(false);
  const editableRef = useRef();
  const sendBtnRef = useRef();
  const msgContainerRef = useRef();

  const history = useHistory();

  const userId = window.localStorage.getItem('userID');
  const openMenu = Boolean(menuAnchorEl);

  if (!userId) {
    return <Redirect to="/login" />;
  }
  const socket = getSocket();
  const menuOption = ['채팅방 이름 변경', '참여자 목록', '채팅방 나가기'];
  const loadUnit = 100;

  const onMessageEvent = message => {
    const newChatRoom = {
      ...chatRoomRef.current,
      length: length + 1,
    };
    setChatRoom(newChatRoom);
    chatRoomRef.current = newChatRoom;
    range.current.end++;

    let newMessages;
    if (message.from === userId) {
      newMessages = messageRef.current.map(m => {
        if (m.id === message.id) {
          return message;
        }
        return m;
      });
    } else {
      newMessages = messageRef.current.concat(message);
    }

    setMessages(newMessages);
    messageRef.current = newMessages;

    socket.emit('read', {
      chatRoomId,
      userId,
      messageIdx: range.current.end,
    });
  };

  const onReadEvent = read => {
    const updatedReadPoints = readPointRef.current.map(point => {
      if (point.id === read.userId) {
        return {
          ...point,
          read: read.messageIdx,
        };
      }
      return point;
    });

    setReadPoints(updatedReadPoints);
    readPointRef.current = updatedReadPoints;
  };

  useEffect(() => {
    if (range.current.end - range.current.start + 1 === loadUnit) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
      previousHeightRef.current = msgContainerRef.current.scrollHeight;
    }
    if (sendRef.current) {
      msgContainerRef.current.scrollTop =
        msgContainerRef.current.scrollHeight - msgContainerRef.current.clientHeight;

      sendRef.current = false;
    }
  });

  useEffect(() => {
    socket.on('message', onMessageEvent);
    socket.on('read', onReadEvent);

    socket.emit('read', {
      chatRoomId,
      userId,
      messageIdx: 10,
    });

    return () => {
      socket.off('read');
      socket.off('message');
    };
  }, []);

  const onPaste = e => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    document.execCommand('insertText', false, text);
  };

  const onEnterPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendBtnRef.current.click();
    }
  };

  const send = () => {
    if (input.length > 0) {
      const id = uuidv4();

      const messageEvent = {
        id,
        chatRoomId: chatRoom._id,
        from: window.localStorage.getItem('userID'),
        type: 'normal',
        content: input,
      };
      socket.emit('message', messageEvent);

      const newMessages = messageRef.current.concat(messageEvent);
      setMessages(newMessages);
      messageRef.current = newMessages;

      setInput('');

      sendRef.current = true;
    }
  };

  const onClickMenuBtn = e => {
    setMenuAnchorEl(e.currentTarget);
  };

  const onCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const onClickInfoIcon = e => {
    console.log('aaa');
    setInfoOpen(true);
    setInfoAnchorEl(e.currentTarget);
  };

  const onCloseInfo = () => {
    setInfoAnchorEl(null);
    setInfoOpen(false);
  };

  const returnToList = () => {
    history.push('/chatrooms');
  };

  const load = async () => {
    if (range.current.start === 0) return;
    const nextStart = range.current.start - 1 > loadUnit ? range.current.start - loadUnit : 0;

    const response = await requestAPI(
      API_GET_MESSAGES().setQuery({ chatRoomId, start: nextStart, end: range.current.start - 1 }),
    );
    if (response.status !== StatusCodes.OK) {
      setEmptyMsg('채팅을 불러오는데 실패했습니다.');
      return;
    }

    setMessages(response.data.concat(messages));

    msgContainerRef.current.scrollTop =
      msgContainerRef.current.scrollHeight - previousHeightRef.current;
    previousHeightRef.current = msgContainerRef.current.scrollHeight;

    range.current.start = nextStart;
  };

  const onScroll = e => {
    const scrollTop = msgContainerRef.current.scrollTop;

    if (scrollTop === 0) {
      load();
    }
  };

  let previous = '';
  const messageList = messages.map((m, idx) => {
    const index = range.current.start + idx;
    const from = chatRoom.participants.find(p => p._id === m.from).name;
    const readCnt = readPoints
      .filter(point => point.id !== userId)
      .filter(point => point.id !== m.from)
      .filter(point => point.read < index).length;
    const isMine = m.from === userId;

    let isSeq = true;
    if (previous !== m.from) {
      previous = m.from;
      isSeq = false;
    }

    return (
      <ChatMessage
        key={index}
        from={from}
        message={m}
        readCnt={readCnt}
        isMine={isMine}
        isSeq={isSeq}
      />
    );
  });

  return (
    <Container className={classes.root}>
      <Container className={classes.header}>
        <ExitToAppIcon className={classes.returnBtn} onClick={returnToList} />
        <Container className={classes.titleContainer}>
          <img
            className={classes.usersIcon}
            src={chatRoom.participants?.length > 2 ? usersIcon : userIcon}
            onClick={onClickInfoIcon}
          />
          <RoomInfoMenu
            open={infoOpen}
            onClose={onCloseInfo}
            anchorEl={infoAnchorEl}
            chatRoom={chatRoom}
          />
          <Typography className={classes.title} variant="h2">
            {chatRoom.name}
          </Typography>
        </Container>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={onClickMenuBtn}
        >
          <MoreVertIcon />
        </IconButton>
        <MainMenu
          open={openMenu}
          onClose={onCloseMenu}
          anchorEl={menuAnchorEl}
          options={menuOption}
        />
      </Container>
      <Container className={classes.msgContainer} onScroll={onScroll} ref={msgContainerRef}>
        <ol className={classes.msgOl}>
          {messageList.length > 0 ? messageList : <Typography>{emptyMsg}</Typography>}
        </ol>
      </Container>
      <Container className={classes.inputContainer}>
        <ContentEditable
          className={classes.input}
          innerRef={editableRef}
          tagName="div"
          html={input}
          onPaste={onPaste}
          onChange={handleInput}
          onKeyPress={onEnterPress}
        />
        <Button className={classes.sendBtn} onClick={send} ref={sendBtnRef}>
          전송
        </Button>
      </Container>
      <UserInfoDialog />
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '0',
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 5px 5px -5px black',
  },
  titleContainer: {
    padding: '0',
    marginBottom: '3px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  returnBtn: {
    width: '35px',
    height: '35px',
    padding: '5px',
    borderRadius: '100%',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#D0D0D0',
    },
  },
  usersIcon: {
    width: '35px',
    height: '35px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  title: {
    margin: 'auto 10px',
    lineHeight: '100%',
    fontSize: '1.5rem',
    fontWeight: '700',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  msgContainer: {
    height: '85vh',
    margin: '0px',
    overflowY: 'auto',
    padding: '0',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  msgOl: {
    padding: '0',
    margin: '0',
  },
  inputContainer: {
    display: 'flex',
    margin: '5px',
    padding: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px -5px 5px -5px black',
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
    },
  },
  sendBtn: {
    width: '10%',
    height: '100%',
  },
});
