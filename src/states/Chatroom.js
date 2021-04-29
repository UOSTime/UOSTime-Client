import { atom } from 'recoil';

const chatroomState = atom({
  key: 'chatroomList',
  default: []
});

export {
    chatroomState,
};
