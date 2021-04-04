import { atom } from 'recoil';

const historiesState = atom({
  key: 'histories',
  default: [
    /*
    {
      year: null,
      term: null,
      termNm: null,
      regName: null,
      createdAt: null,
    }
    */
  ],
});

export {
  historiesState,
};
