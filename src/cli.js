#!/usr/bin/env node
const program = require('commander');

process.on('unhandledRejection', (error) => {
  console.error(error);
});

program
  .version('0.1.0')
  .command('config', 'Details about configuration', {
    executableFile: './commands/config/index.js',
  })
  .command('database', 'Database commands', {
    executableFile: './commands/database/index.js',
  })
  .command('graph', 'Graph commands', {
    executableFile: './commands/graph/index.js',
  })
  .parse(process.argv);
