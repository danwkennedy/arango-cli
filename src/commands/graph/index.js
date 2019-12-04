#!/usr/bin/env node
import program from 'commander';

program
  .version('0.1.0')
  .command('create', 'create a new graph', { executableFile: './create.js' })
  //   .command('list', 'list packages installed', { isDefault: true })
  //   .command('remove <name>', 'drop a graph')
  //   .command('update <name>', 'update a graph')
  .parse(process.argv);
