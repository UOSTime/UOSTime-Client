const Terms = {
  A10: '1학기',
  A11: '여름계절학기',
  A20: '2학기',
  A21: '겨울계절학기',
};

export function getAllTerms() {
  return Object.entries(Terms).map(([termCode, termName]) => ({ termCode, termName }));
}

export function getTermNamebyCode(code) {
  const termName = Terms[code];
  if (termName) return termName;
  throw new Error(`Unexpected term code ${code}.`);
}
