module.exports = async function createGraph(db, opts) {
  const graph = db.graph(opts.name);

  await graph.create({
    edgeDefinitions: opts.edges.map(edge => ({
      collection: edge.name,
      from: [edge.from],
      to: [edge.to]
    }))
  });

  for (const edge of opts.edges) {
    if (edge.indexes && edge.indexes.length > 0) {
      const collection = graph.edgeCollection(edge.name);
      await Promise.all(
        edge.indexes.map(index => collection.createIndex(index))
      );
    }
  }

  if (opts.vertices && opts.vertices.length > 0) {
    await Promise.all(
      opts.vertices.map(vertex => graph.addVertexCollection(vertex))
    );
  }
};
