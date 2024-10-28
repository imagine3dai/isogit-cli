import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';

export function branch(program: Command) {
  program
    .command('branch')
    .description('List, create, or delete branches')
    .argument('[branchName]', 'The name of the branch to create')
    .option('-d, --delete', 'Delete a branch')
    .option('-l, --list', 'List all branches')
    .option('-r, --remote', 'List or delete remote-tracking branches')
    .action(async (branchName: string | undefined, options) => {
      try {
        const dir = await getRepoRoot();

        if (options.list || (!branchName && !options.delete)) {
          const branches = await git.listBranches({ fs, dir });
          const currentBranch = await git.currentBranch({ fs, dir });
          
          for (const branch of branches) {
            if (branch === currentBranch) {
              logger.info(`* ${branch}`);
            } else {
              logger.info(`  ${branch}`);
            }
          }
          return;
        }

        if (options.delete && branchName) {
          await git.deleteBranch({ fs, dir, ref: branchName });
          logger.success(`Deleted branch ${branchName}`);
          return;
        }

        if (branchName) {
          await git.branch({ fs, dir, ref: branchName });
          logger.success(`Created branch ${branchName}`);
        }
      } catch (error) {
        logger.error('Branch operation failed:', error);
      }
    });
}