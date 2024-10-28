import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';

export function checkout(program: Command) {
  program
    .command('checkout')
    .description('Switch branches or restore working tree files')
    .argument('[branch]', 'Branch to checkout')
    .option('-b, --new-branch', 'Create and checkout a new branch')
    .option('-f, --force', 'Force checkout (throw away local modifications)')
    .action(async (branch: string | undefined, options) => {
      try {
        const dir = await getRepoRoot();

        if (options.newBranch && branch) {
          await git.branch({ fs, dir, ref: branch });
        }

        if (branch) {
          await git.checkout({
            fs,
            dir,
            ref: branch,
            force: options.force
          });
          logger.success(`Switched to branch '${branch}'`);
        } else {
          logger.error('Please specify a branch name');
        }
      } catch (error) {
        logger.error('Checkout failed:', error);
      }
    });
}