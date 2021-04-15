import { atom, atomFamily } from 'recoil';

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

const highLightState = atom({
  key: 'highlight',
  default: [null]
});

const currentTimeTableState = atom({
  key: 'currentTimeTable',
  default: null
});

export {
  timeTableState,
  highLightState,
  currentTimeTableState
};