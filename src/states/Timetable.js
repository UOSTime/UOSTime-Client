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
});

const timeTableListState = atom({
  key: 'timeTableList',
  default: []
});

const highLightState = atom({
  key: 'highlight',
  default: [null]
});

export {
  timeTableMapState,
  timeTableState,
  timeTableListState,
  highLightState
};