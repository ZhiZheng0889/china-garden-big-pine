/**
 * Shallow check if objects values is empty or null
 *
 * @param {object} obj
 */
export const isObjectEmpty = (obj) => {
  return Object.values(obj).every((x) => x === null || x === "");
};
