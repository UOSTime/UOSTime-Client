import { atom, atomFamily } from 'recoil';

const timeTableMapState = atom({
    key: 'timetableMap',
    default: {}
  });
  
const timeTableState = atomFamily({
    key: 'timetable',
    default: {
        _id: null,
        uid: null,
        yaer: null,
        term: null,
        tlecture_list: [],
        createAt: [],
        updateAt: []
    }
})

  export {
    timeTableMapState,
    timeTableState,
  };