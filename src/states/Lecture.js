import { atom } from 'recoil';

const searchLectureListState = atom({
  key: 'searchLectureList',
  default: [],
});

const highLightLectureState = atom({
  key: 'highlightLecture',
  default: null,
});

export {
  searchLectureListState,
  highLightLectureState,
};
