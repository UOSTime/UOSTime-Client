import { atom, selectorFamily } from 'recoil';
import { API_FIND_CHATROOM, API_GET_MESSAGES, requestAPI } from '../utils/api';

const chatroomState = atom({
  key: 'chatroomList',
  default: [],
});

const messagesState = atom({
  key: 'messageList',
  default: [],
});

const emptyMsg = atom({
  key: 'emptyMsg',
  default: null,
});

const currentChatRoom = selectorFamily({
  key: 'currentChatRoom',
  get: chatRoomId => async () => {
    const { data: chatRoom } = await requestAPI(API_FIND_CHATROOM().setPathParam(chatRoomId));
    const { data: messages } = await requestAPI(
      API_GET_MESSAGES().setQuery({ chatRoomId, start: 0, end: 10 }),
    );
    return { chatRoom, messages };
  },
});

export { messagesState, chatroomState, emptyMsg, currentChatRoom };
