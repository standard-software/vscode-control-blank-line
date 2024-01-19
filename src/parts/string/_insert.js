const { _subFirst } = require('./_subFirst.js')
const { _subLast } = require('./_subLast.js')

const _insert = (str, value, index = 0) => {
  str = _subFirst(str, index)
    + value + _subLast(str, str.length - index);
  return str;
};

module.exports = { _insert }
