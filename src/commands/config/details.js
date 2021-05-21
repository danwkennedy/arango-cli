#!/usr/bin/env node
const program = require('commander');
const wrap = require('../wrapper');

async function printConfiguration({ configuration, logger }) {
  logger.info(configuration);
}

program.action(wrap(printConfiguration)).parse(process.argv);
