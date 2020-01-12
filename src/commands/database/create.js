#!/usr/bin/env node
const program = require('commander');
const { Database } = require('arangojs');
const { createDatabase } = require('../../database');
const wrap = require('../wrapper');

async function createNewDatabase({ configuration, logger }) {
  const db = new Database({
    url: configuration.connection.urls
  });

  const databaseConfig = configuration.database;

  db.useDatabase(databaseConfig.name);

  if (await db.exists()) {
    logger.info(`Database '${databaseConfig.name}' already exists`);
    return;
  }

  try {
    logger.info(`Creating database '${databaseConfig.name}'`);
    await createDatabase(db, databaseConfig);
    logger.info(`Database created`);
  } catch (err) {
    logger.error(`Error creating database '${databaseConfig.name}'`);
    logger.error(err.message);
  }
}

program.action(wrap(createNewDatabase)).parse(process.argv);
