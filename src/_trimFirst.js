const { isUndefined } = require('./isUndefined.js')
const { _findFirst } = require('./_findFirst.js')
const { _isFirst } = require('./_isFirst.js')
const { _deleteFirst } = require('./_deleteFirst.js')

const _trimFirst = (
  str,
  valueArray = [' ', '\t', '\r', '\n'],
) => {
  while (true) {
    const value = _findFirst(
      valueArray, value => _isFirst(str, value),
    );
    if (isUndefined(value)) {
      break;
    }
    str = _deleteFirst(str, value.length);
  }
  return str;
};

module.exports = { _trimFirst }
