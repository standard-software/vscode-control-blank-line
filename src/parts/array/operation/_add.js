const _add = (array, valueArray, index = array.length - 1) => {
  array.splice(index + 1, 0, ...valueArray);
  return array;
};

module.exports = { _add };
