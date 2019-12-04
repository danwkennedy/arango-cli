const getDb = require('../services/arangodb');

const createCollection = require('./create-collection');
const updateCollection = require('./update-collection');
const graphOptions = require('./');

module.exports = async function updateGraph() {
  const db = await getDb();
  const graph = db.graph(graphOptions.name);

  const allCollections = graphOptions.vertexes.concat(graphOptions.edges);

  for (const vertex of allCollections) {
    const collection = db.collection(vertex.name);

    if (await collection.exists()) {
      console.log(`Updating ${vertex.name}`);
      await updateCollection(db, vertex);
    } else {
      console.log(`Creating ${vertex.name}`);
      await createCollection(db, vertex);
    }
  }

  for (const edge of graphOptions.edges) {
    const collection = db.collection(edge.name);

    if (await collection.exists()) {
      console.log(`Updating edge ${edge.name}`);
      updateCollection(db, edge);
    } else {
      console.log(`Creating edge ${edge.name}`);
      await graph.addEdgeDefinition({
        collection: edge.name,
        from: [edge.from],
        to: [edge.to]
      });
    }
  }
};
