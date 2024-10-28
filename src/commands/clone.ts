import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';
import http from 'isomorphic-git/http/web';

export function clone(program: Command) {
  program
    .command('clone')
    .description('Clone a repository into a new directory')
    .argument('<url>', 'Repository URL to clone')
    .argument('[directory]', 'Target directory')
    .option('-b, --branch <name>', 'Clone specific branch instead of HEAD')
    .option('--depth <depth>', 'Create shallow clone with specified depth')
    .option('--single-branch', 'Clone only one branch')
    .action(async (url: string, directory: string | undefined, options) => {
      try {
        const dir = directory || path.basename(url, '.git');
        
        logger.info(`Cloning into '${dir}'...`);
        
        await git.clone({
          fs,
          http,
          dir,
          url,
          ref: options.branch,
          singleBranch: options.singleBranch,
          depth: options.depth ? parseInt(options.depth) : undefined
        });

        logger.success('Clone completed successfully');
      } catch (error) {
        logger.error('Clone failed:', error);
      }
    });
}