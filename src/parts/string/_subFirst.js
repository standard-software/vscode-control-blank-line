const { _subLength } = require(`./_subLength.js`)

const _subFirst = (str, length = 1) => {
  return _subLength(
    str, 0, length,
  );
};

module.exports = { _subFirst }
