import { atom } from 'recoil';

const popupState = atom({
  key: 'popup',
  default: {
    open: false,
    title: '',
    content: '',
  },
});

export {
  popupState,
};
