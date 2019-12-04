// const getDb = require('../services/arangodb');

const setupCreateDatabase = require('./create-database');
// const graphOptions = require('./');

module.exports = function(db) {
  const createDatabase = setupCreateDatabase(db);
  return async function createGraph(options) {
    // const db = await getDb();

    const graph = db.graph(options.name);

    await createDatabase(db, options);

    await graph.create({
      edgeDefinitions: options.edges.map(edge => ({
        collection: edge.name,
        from: [edge.from],
        to: [edge.to]
      }))
    });
  };
};
