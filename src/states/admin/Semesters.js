import { atom } from 'recoil';

const semestersState = atom({
  key: 'semesters',
  default: [
    /*
    {
      year: null,
      term: null,
      termNm: null,
      regName: null,
      useFlag: null,
      createdAt: null,
    }
    */
  ],
});

export {
  semestersState,
};
