module.exports = async function (collection, opts) {
  await collection.create(opts.properties);
  await Promise.all(opts.indexes.map((index) => collection.createIndex(index)));
};
