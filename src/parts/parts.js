const { isBoolean } = require('./type/isBoolean.js')
const { isUndefined } = require('./type/isUndefined.js')
const { isNumber } = require('./type/isNumber.js')
const { __max } = require('./array/__max.js')
const { _indexOfFirst } = require('./string/_indexOfFirst.js')
const { _indexOfLast } = require('./string/_indexOfLast.js')
const { _isFirst } = require('./string/_isFirst.js')
const { _isLast } = require('./string/_isLast.js')
const { _findFirstIndex } = require('./array/_findFirstIndex.js')
const { _findFirst } = require('./array/_findFirst.js')
const { _deleteIndex } = require('./string/_deleteIndex.js')
const { _deleteLength } = require('./string/_deleteLength.js')
const { _deleteFirst } = require('./string/_deleteFirst.js')
const { _deleteLast } = require('./string/_deleteLast.js')
const { _trimFirst } = require('./string/_trimFirst.js')
const { _trimLast } = require('./string/_trimLast.js')
const { _subLength } = require('./string/_subLength.js')
const { _subFirst } = require('./string/_subFirst.js')
const { _subLast } = require('./string/_subLast.js')
const { _insert } = require('./string/_insert.js')
const { _excludeLast } = require('./string/_excludeLast.js')

module.exports = {
  isUndefined, isBoolean, isNumber,
  __max,
  _indexOfFirst, _indexOfLast,
  _isFirst, _isLast,
  _findFirstIndex, _findFirst,
  _deleteIndex, _deleteLength,
  _deleteFirst, _deleteLast,
  _trimFirst, _trimLast,
  _subLength,
  _subFirst, _subLast,
  _insert,
  _excludeLast,
}
