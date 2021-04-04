import { atom } from 'recoil';

const semesterState = atom({
  key: 'semester',
  default: {
    year: null,
    term: null,
  },
});

export {
  semesterState,
};
