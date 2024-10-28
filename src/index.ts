#!/usr/bin/env node
import { program } from 'commander';
import { loadCommands } from './commands/index.js';
import { setupTheme } from './utils/theme.js';

async function main() {
  setupTheme();
  
  program
    .name('igit')
    .description('A complete Git CLI implementation using isomorphic-git')
    .version('1.0.0');

  await loadCommands(program);
  
  program.parse(process.argv);
}

main().catch(console.error);