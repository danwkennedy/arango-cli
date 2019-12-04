module.exports = function(db) {
  return async function createCollection(opts) {
    const collection = db.collection(opts.name);

    await collection.create(opts.properties);
    await Promise.all(opts.indexes.map(index => collection.createIndex(index)));
  };
};
