const { _isLast } = require(`./_isLast.js`);
const { _deleteLast } = require(`./_deleteLast.js`);

const _excludeLast = (str, value) => {
  if (_isLast(str, value)) {
    return _deleteLast(str, value.length);
  }
  return str;
};

module.exports = { _excludeLast };
