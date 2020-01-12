const updateCollection = require('../database/update-collection');

module.exports = async function updateEdge(graph, name, opts) {
  await graph.replaceEdgeDefinition(name, opts);
  const edge = graph.edgeCollection(name);

  await updateCollection(edge, opts);
};
