const updateCollection = require('./update-collection');
const createCollection = require('./create-collection');

module.exports = async function (db, opts) {
  for (const collectionOpts of opts.collections) {
    const collection = db.collection(collectionOpts.name);

    if (await collection.exists()) {
      await updateCollection(collection, collectionOpts);
    } else {
      await createCollection(collection, collectionOpts);
    }
  }
};
