module.exports = async function updateCollection(db, opts) {
  const collection = db.collection(opts.name);
  await collection.setProperties(opts.properties);

  const indexes = await collection.indexes();
  const missingIndexes = opts.indexes.filter(index =>
    indexes.find(i => i.name === index.name)
  );

  await Promise.all(missingIndexes.map(index => collection.createIndex(index)));
};
