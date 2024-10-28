import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import { logger } from '../utils/logger.js';

export function init(program: Command) {
  program
    .command('init')
    .description('Create an empty Git repository')
    .option('-b, --bare', 'Create a bare repository')
    .option('--initial-branch <name>', 'Use the specified name for the initial branch', 'main')
    .action(async (options) => {
      try {
        const dir = process.cwd();
        await git.init({
          fs,
          dir,
          defaultBranch: options.initialBranch,
          bare: options.bare
        });
        
        logger.success(`Initialized ${options.bare ? 'bare ' : ''}Git repository in ${dir}`);
      } catch (error) {
        logger.error('Failed to initialize repository:', error);
      }
    });
}