import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import http from 'isomorphic-git/http/web';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';

export function push(program: Command) {
  program
    .command('push')
    .description('Update remote refs along with associated objects')
    .argument('[remote]', 'Remote to push to', 'origin')
    .argument('[branch]', 'Branch to push')
    .option('-f, --force', 'Force push')
    .option('--tags', 'Push all tags')
    .action(async (remote: string, branch: string | undefined, options) => {
      try {
        const dir = await getRepoRoot();
        const currentBranch = await git.currentBranch({ fs, dir }) as string;
        
        if (!currentBranch && !branch) {
          throw new Error('Not on any branch and no branch specified');
        }

        logger.info(`Pushing to ${remote}/${branch || currentBranch}...`);

        await git.push({
          fs,
          http,
          dir,
          remote,
          ref: branch || currentBranch,
          force: options.force
        });

        if (options.tags) {
          const tags = await git.listTags({ fs, dir });
          for (const tag of tags) {
            await git.push({
              fs,
              http,
              dir,
              remote,
              ref: `refs/tags/${tag}`
            });
          }
        }

        logger.success('Push completed successfully');
      } catch (error) {
        logger.error('Push failed:', error);
      }
    });
}