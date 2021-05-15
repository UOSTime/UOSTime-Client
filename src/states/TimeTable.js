import { atom } from 'recoil';

const timetableListState = atom({
  key: 'timetableList',
  default: [],
  // {
  //   _id: null,
  //   uid: null,
  //   name: null,
  //   year: null,
  //   term: null,
  //   tlecture_list: [],
  //   createAt: [],
  //   updateAt: [],
  //   __v: null,
  // },
});

const currentTimetableIndexState = atom({
  key: 'currentTimetableIndex',
  default: null,
});

export {
  timetableListState,
  currentTimetableIndexState,
};
