#!/usr/bin/env node
const program = require('commander');
const { Database } = require('arangojs');
const { updateDatabase } = require('../../database');
const wrap = require('../wrapper');

async function update({ configuration, logger }) {
  const db = new Database({
    url: configuration.connection.urls,
  });

  const databaseConfig = configuration.database;

  db.useDatabase(databaseConfig.name);

  if (!(await db.exists())) {
    logger.info(`Database '${databaseConfig.name}' does not exist`);
    return;
  }

  try {
    logger.info(`Updating database '${databaseConfig.name}'`);
    await updateDatabase(db, databaseConfig);
    logger.info(`Database updated`);
  } catch (err) {
    logger.error(`Error updating database '${databaseConfig.name}'`);
    logger.error(err.message);
  }
}

program.action(wrap(update)).parse(process.argv);
