import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import http from 'isomorphic-git/http/web';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';

export function pull(program: Command) {
  program
    .command('pull')
    .description('Fetch from and integrate with another repository')
    .argument('[remote]', 'Remote to pull from', 'origin')
    .argument('[branch]', 'Branch to pull')
    .option('--no-ff', 'Create a merge commit even when the merge resolves as a fast-forward')
    .option('--ff-only', 'Refuse to merge unless the current HEAD is already up to date or the merge can be resolved as a fast-forward')
    .action(async (remote: string, branch: string | undefined, options) => {
      try {
        const dir = await getRepoRoot();
        const currentBranch = await git.currentBranch({ fs, dir });
        
        if (!currentBranch) {
          throw new Error('Not on any branch');
        }

        logger.info(`Pulling from ${remote}/${branch || currentBranch}...`);

        await git.pull({
          fs,
          http,
          dir,
          remote,
          ref: branch || currentBranch,
          fastForward: options.ff ? true : false
        });

        logger.success('Pull completed successfully');
      } catch (error) {
        logger.error('Pull failed:', error);
      }
    });
}