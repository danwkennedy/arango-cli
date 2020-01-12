#!/usr/bin/env node
const program = require('commander');

program
  .version('0.1.0')
  .command('details', 'details about the configuration', {
    executableFile: './details.js',
    isDefault: true
  })
  .parse(process.argv);
