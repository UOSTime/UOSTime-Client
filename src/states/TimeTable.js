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

// available values: 0 ~ (timetableList.length - 1)
const currentTimetableIndexState = atom({
  key: 'currentTimetableIndex',
  default: 0,
});

// available values: '12' or '24'
const timeFormatState = atom({
  key: 'timeFormat',
  default: '12',
});

// available values: (boolean)
const showNightTimesState = atom({
  key: 'showNightTimes',
  default: true,
});

// available values: (boolean)
const showSaturdayState = atom({
  key: 'showSaturday',
  default: false,
});

export {
  timetableListState,
  currentTimetableIndexState,
  timeFormatState,
  showNightTimesState,
  showSaturdayState,
};
