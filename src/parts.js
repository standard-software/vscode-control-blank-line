const { isBoolean } = require('./parts/type/isBoolean.js')
const { isUndefined } = require('./parts/type/isUndefined.js')
const { isNumber } = require('./parts/type/isNumber.js')
const { __max } = require('./parts/array/__max.js')
const { _indexOfFirst } = require('./parts/string/_indexOfFirst.js')
const { _indexOfLast } = require('./parts/string/_indexOfLast.js')
const { _isFirst } = require('./parts/string/_isFirst.js')
const { _isLast } = require('./parts/string/_isLast.js')
const { _findFirstIndex } = require('./parts/array/_findFirstIndex.js')
const { _findFirst } = require('./parts/array/_findFirst.js')
const { _deleteIndex } = require('./parts/string/_deleteIndex.js')
const { _deleteLength } = require('./parts/string/_deleteLength.js')
const { _deleteFirst } = require('./parts/string/_deleteFirst.js')
const { _deleteLast } = require('./parts/string/_deleteLast.js')
const { _trimFirst } = require('./parts/string/_trimFirst.js')
const { _trimLast } = require('./parts/string/_trimLast.js')
const { _subLength } = require('./parts/string/_subLength.js')
const { _subFirst } = require('./parts/string/_subFirst.js')
const { _subLast } = require('./parts/string/_subLast.js')
const { _insert } = require('./parts/string/_insert.js')
const { _excludeLast } = require('./parts/string/_excludeLast.js')

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
