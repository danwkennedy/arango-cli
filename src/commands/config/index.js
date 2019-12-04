#!/usr/bin/env node
import program from 'commander';

program
  .version('0.1.0')
  .command('details', 'details about the configuration', {
    executableFile: './details.js',
    isDefault: true
  })
  .parse(process.argv);
