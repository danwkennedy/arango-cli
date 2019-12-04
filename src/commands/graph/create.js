#!/usr/bin/env node
import program from 'commander';
import { createGraph } from '../../graph/create-graph';

program.arguments('<name>').action(async function(name) {
  console.log(`Creating graph with name: ${name}`);
  // await config =
  await createGraph(name, config);

  console.log(`Graph created`);
});

program.parse(process.argv);
