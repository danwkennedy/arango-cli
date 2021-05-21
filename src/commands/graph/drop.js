#!/usr/bin/env node
const program = require('commander');
const { Database } = require('arangojs');
const dropGraph = require('../../graph/drop-graph');
const wrap = require('../wrapper');

async function create(name, { configuration, logger }) {
  const db = new Database({
    url: configuration.connection.urls,
  });

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

  const graph = db.graph(graphConfig.name);

  if (!(await graph.exists())) {
    logger.error(`Graph '${graphConfig.name}' does not exist`);
    return;
  }

  logger.info(`Dropping graph '${name}'`);
  await dropGraph(db, graphConfig);

  logger.info(`Graph dropped`);
}

program.arguments('<name>').action(wrap(create)).parse(process.argv);
