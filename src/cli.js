#!/usr/bin/env node
import program from 'commander';

program
  .version('0.1.0')
  .command('graph', 'Graph commands', {
    executableFile: './commands/graph/index.js'
  })
  .command('config', 'Details about configuration', {
    executableFile: './commands/config/index.js'
  })
  .parse(process.argv);

// process.on('unhandledRejection', error => {
//   console.error(error);
// });

// // const commands = require('./commands');

// commands.configure(program);
// // commands.map(command => command(program))/

// program.parse(process.argv);
