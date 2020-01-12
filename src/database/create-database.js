const createCollection = require('./create-collection');

module.exports = async function(db, opts) {
  db.useDatabase('_system');
  await db.createDatabase(opts.name);
  db.useDatabase(opts.name);

  for (const collection of opts.collections) {
    await createCollection(db, collection);
  }
};
