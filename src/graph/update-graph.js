const updateCollection = require('../database/update-collection');

module.exports = async function updateGraph(db, opts, { logger = null }) {
  const graph = db.graph(opts.name);

  for (const edge of opts.edges) {
    const collection = db.collection(edge.name);

    if (await collection.exists()) {
      logger?.info(`Updating edge ${edge.name}`);
      updateCollection(collection, edge);
    } else {
      logger?.info(`Creating edge ${edge.name}`);
      await graph.addEdgeDefinition({
        collection: edge.name,
        from: [edge.from],
        to: [edge.to],
      });
    }
  }
};
