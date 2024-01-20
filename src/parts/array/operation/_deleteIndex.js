const _deleteIndex = (
  array, indexStart, indexEnd = indexStart,
) => {
  array.splice(indexStart, indexEnd - indexStart + 1);
  return array;
};

module.exports = { _deleteIndex };
