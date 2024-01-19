const { isBoolean } = require('./parts/type/isBoolean.js')
const { isUndefined } = require('./parts/type/isUndefined.js')
const { isNumber } = require('./parts/type/isNumber.js')
const { __max } = require('./parts/array/__max.js')
const { _indexOfFirst } = require('./_indexOfFirst.js')
const { _indexOfLast } = require('./_indexOfLast.js')
const { _isFirst } = require('./_isFirst.js')
const { _isLast } = require('./_isLast.js')
const { _findFirstIndex } = require('./parts/array/_findFirstIndex.js')
const { _findFirst } = require('./parts/array/_findFirst.js')
const { _deleteIndex } = require('./_deleteIndex.js')
const { _deleteLength } = require('./_deleteLength.js')
const { _deleteFirst } = require('./_deleteFirst.js')
const { _deleteLast } = require('./_deleteLast.js')
const { _trimFirst } = require('./_trimFirst.js')
const { _trimLast } = require('./_trimLast.js')
const { _subLength } = require('./_subLength.js')
const { _subFirst } = require('./_subFirst.js')
const { _subLast } = require('./_subLast.js')
const { _insert } = require('./_insert.js')
const { _excludeLast } = require('./_excludeLast.js')

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
