#!/usr/bin/env node
const program = require('commander');
const { Database } = require('arangojs');
const updateGraph = require('../../graph/update-graph');
const wrap = require('../wrapper');

async function update(name, { configuration, logger }) {
  const db = new Database({
    url: configuration.connection.urls,
  });

  if (configuration.connection.username && configuration.connection.password) {
    db.useBasicAuth(
      configuration.connection.username,
      configuration.connection.password
    );
  }

  const databaseConfig = configuration.database;

  db.useDatabase(databaseConfig.name);

  if (!(await db.exists())) {
    logger.error(`Database '${databaseConfig.name}' does not exist`);
    return;
  }

  const graphConfig = configuration.graphs.find((graph) => graph.name == name);

  if (!graphConfig) {
    logger.error(`Graph with name ${name} not configured`);
    return;
  }

  logger.info(`Creating graph '${name}'`);
  await updateGraph(db, graphConfig);

  logger.info(`Graph created`);
}

program.arguments('<name>').action(wrap(update)).parse(process.argv);
