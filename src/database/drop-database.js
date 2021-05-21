module.exports = async function (db, opts) {
  db.useDatabase('_system');
  await db.dropDatabase(opts.name);
};
