import { atom } from 'recoil';

const userInfoDialogState = atom({
  key: 'userInfoDialog',
  default: {
      open: false,
      userId: ''
  },
});

export {
  userInfoDialogState,
};
  