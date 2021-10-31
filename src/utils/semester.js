import { getToday } from '@utils/time';

const Terms = {
  A10: {
    name: '1학기',
    month: 1,
  },
  A11: {
    name: '여름계절학기',
    month: 5,
  },
  A20: {
    name: '2학기',
    month: 7,
  },
  A21: {
    name: '겨울계절학기',
    month: 11,
  },
};

export const getTermsAsArray = () => Object
  .entries(Terms)
  .map(([code, { name, month }]) => ({
    code,
    name,
    month,
  }));

const getSemesterValue = (year, term) => `${year}-${term}`;

export const getTermNamebyCode = code => Terms[code]?.name;

export const convertSemesterToString = ({ year, term }) => `${year}-${term}`;
export const convertStringToSemester = str => {
  const [year, term] = str.split('-');
  return { year, term };
};

// return semesters as array in time order
export const getAllSemesters = () => {
  const terms = getTermsAsArray();
  const { year, month: todayMonth } = getToday();

  const semesters = [];

  for (let i = 3; i >= 0; i--) {
    terms.forEach(({ code, name, month }) => {
      if (i || todayMonth >= month) {
        semesters.push({
          value: getSemesterValue(year - i, code),
          text: `${year - i}년 ${name}`,
          year,
          term: code,
        });
      }
    });
  }

  return semesters;
};

export const currentSemester = getAllSemesters().pop();
