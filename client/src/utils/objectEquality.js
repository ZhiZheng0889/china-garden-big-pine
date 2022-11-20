/*
  comparison of two object to see if keys and values are the same.
  param ignore is an array that ignores the properties passed into the array.
  param config is an object of a key of an object property and a value of a function
  that gets ran on that property with params of obj1 and obj2

*/
export const objectIsEqual = (obj1, obj2, ignore = [], config = {}) => {
  Object.keys(obj1).forEach((property) => {
    console.log(property);
    if (Object.keys(config).includes(property)) {
      if (config[property](obj1, obj2) === false) {
        return false;
      }
    } else if (!ignore.includes(property)) {
      console.log(obj1[property], obj2[property]);
      if (obj1[property] !== obj2[property]) {
        console.log('not equal');
        return false;
      }
    }
  });

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  return true;
};
