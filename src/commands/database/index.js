#!/usr/bin/env node
const program = require('commander');

program
  .version('0.1.0')
  .command('create', 'creates a database', {
    executableFile: './create.js',
  })
  .command('drop', 'drops a database', {
    executableFile: './drop.js',
  })
  .command('update', 'updates a database', {
    executableFile: './update.js',
  })
  .parse(process.argv);
