export const isObjectEmpty = (obj) => {
  return Object.values(obj).every((x) => x === null || x === '');
};
