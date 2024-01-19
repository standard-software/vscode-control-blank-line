const { _deleteLength } = require(`./_deleteLength.js`)

const _deleteFirst = (str, length = 1) => {
  return _deleteLength(
    str, 0, length,
  );
};

module.exports = { _deleteFirst }
