import { atom } from 'recoil';

const userIDState = atom({
  key: 'userID',
  default: window.localStorage.getItem('userID'),
});

const userNicknameState = atom({
  key: 'userNickname',
  default: null,
});

export {
  userIDState,
  userNicknameState,
};
