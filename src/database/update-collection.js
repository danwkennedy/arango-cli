module.exports = async function updateCollection(collection, opts) {
  await collection.setProperties(opts.properties);

  const indexes = await collection.indexes();
  const missingIndexes = opts.indexes.filter(
    (index) => indexes.find((i) => i.name === index.name) == null
  );

  const indexesToDelete = indexes.filter(
    (index) =>
      index.name != 'primary' &&
      opts.indexes.find((i) => i.name === index.name) == null
  );

  await Promise.all(
    missingIndexes.map((index) => collection.createIndex(index))
  );
  await Promise.all(
    indexesToDelete.map((index) => collection.dropIndex(index))
  );
};
