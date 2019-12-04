#!/usr/bin/env node
import program from 'commander';
import resolveConfiguration from '../../configuration/index.js';

console.log(resolveConfiguration);

program.action(function() {
  const config = resolveConfiguration(process.cwd());
  console.log(`Getting configuration details`);
  console.log(config);
});

program.parse(process.argv);
