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

export const getTermNamebyCode = code => Terms[code]?.name;
