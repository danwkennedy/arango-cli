const getDb = require('../services/arangodb');

module.exports = async function removeGraph(name) {
  const db = await getDb();
  db.useDatabase('_system');
  await db.dropDatabase(name);
};
