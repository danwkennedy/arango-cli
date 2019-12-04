const setupCreateCollection = require('./create-collection');

module.exports = function(db) {
  const createCollection = setupCreateCollection(db);

  return async function createDatabase(db, options) {
    for (const vertex of options.vertexes) {
      await createCollection(db, vertex);
    }
  };
};
