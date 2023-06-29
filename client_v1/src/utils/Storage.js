/**
 * Turn JSON into js native object
 *
 * @param {string} json
 */
const decodeJson = (json) => {
  return JSON.parse(json);
};

/**
 * Turn js object into a JSON string
 *
 * @param {any} data
 */
const encodeJson = (data) => {
  return JSON.stringify(data);
};

/**
 * Get data from local storage.
 *
 * @param {string} key - Storage key
 */
const get = (key) => {
  try {
    const foundItem = localStorage.getItem(key);
    return foundItem ? decodeJson(foundItem) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Set data to local storage.
 *
 * @param {string} key - Storage key
 * @param {any} value - Storage value
 */
const set = (key, value) => {
  try {
    if (value) {
      localStorage.setItem(key, encodeJson(value));
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

/**
 * Remove data from local storage.
 *
 * @param {string} key - Storage key
 */
const remove = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Remove multiple data from local storage.
 *
 * @param {string[]} keys - Storage keys
 */
const removeMultiple = (keys) => {
  try {
    keys.forEach((key) => remove(key));
    return true;
  } catch (error) {
    return false;
  }
};

const Storage = {
  get,
  set,
  remove,
  removeMultiple,
};

Object.freeze(Storage);
export default Storage;
