import { atom } from 'recoil';
import { currentSemester } from '@utils/semester';

const semesterState = atom({
  key: 'semester',
  default: {
    year: currentSemester.year,
    term: currentSemester.term,
  },
});

export {
  semesterState,
};
