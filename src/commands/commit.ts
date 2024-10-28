import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';

export function commit(program: Command) {
  program
    .command('commit')
    .description('Record changes to the repository')
    .option('-m, --message <message>', 'Use the given message as the commit message')
    .option('-a, --all', 'Automatically stage files that have been modified and deleted')
    .option('--amend', 'Amend previous commit')
    .action(async (options) => {
      try {
        const dir = await getRepoRoot();

        if (!options.message) {
          logger.error('Please provide a commit message using -m or --message');
          return;
        }

        if (options.all) {
          const status = await git.statusMatrix({ fs, dir });
          for (const [filepath, , workdir] of status) {
            if (workdir === 2) {
              await git.add({ fs, dir, filepath });
            }
          }
        }

        const author = {
          name: await git.getConfig({ fs, dir, path: 'user.name' }) || 'Unknown',
          email: await git.getConfig({ fs, dir, path: 'user.email' }) || 'unknown@example.com'
        };

        const commitOid = await git.commit({
          fs,
          dir,
          message: options.message,
          author,
          amend: options.amend
        });

        logger.success(`[${commitOid}] ${options.message}`);
      } catch (error) {
        logger.error('Commit failed:', error);
      }
    });
}