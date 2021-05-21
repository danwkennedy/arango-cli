#!/usr/bin/env node
const program = require('commander');
const { Database } = require('arangojs');
const { dropDatabase } = require('../../database');
const wrap = require('../wrapper');

async function drop({ configuration, logger }) {
  const db = new Database({
    url: configuration.connection.urls,
  });

  const databaseConfig = configuration.database;

  db.useDatabase(databaseConfig.name);

  if (!(await db.exists())) {
    logger.info(`Database '${databaseConfig.name}' doesn't exit`);
    return;
  }

  try {
    logger.info(`Dropping database '${databaseConfig.name}'`);
    await dropDatabase(db, databaseConfig);
    logger.info(`Database dropped`);
  } catch (err) {
    logger.error(`Error dropping database '${databaseConfig.name}'`);
    logger.error(err.message);
  }
}

program.action(wrap(drop)).parse(process.argv);
