#!/usr/bin/env node
const program = require('commander');

program
  .version('0.1.0')
  .command('create', 'create a new graph', { executableFile: './create.js' })
  //   .command('list', 'list packages installed', { isDefault: true })
  .command('drop', 'drop a graph', { executableFile: './drop.js' })
  .command('update', 'update a graph', { executableFile: './update.js' })
  .parse(process.argv);
