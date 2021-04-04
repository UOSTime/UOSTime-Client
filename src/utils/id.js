import _ from 'lodash';

// return array of randomly generated unique IDs
export function getUniqueID(length = 1) {
  return Array(length).fill().map(() => _.uniqueId());
}
