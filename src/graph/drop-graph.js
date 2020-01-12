module.exports = async function dropGraph(db, opts) {
  const graph = db.graph(opts.name);
  await graph.drop();
};
