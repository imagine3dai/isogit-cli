import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';

export function remote(program: Command) {
  program
    .command('remote')
    .description('Manage set of tracked repositories')
    .argument('[command]', 'Command to execute (add, remove, list)')
    .argument('[name]', 'Remote name')
    .argument('[url]', 'Remote URL')
    .option('-v, --verbose', 'Be verbose')
    .action(async (command: string | undefined, name: string | undefined, url: string | undefined, options) => {
      try {
        const dir = await getRepoRoot();

        switch (command) {
          case 'add':
            if (!name || !url) {
              throw new Error('Remote name and URL are required');
            }
            await git.addRemote({ fs, dir, remote: name, url });
            logger.success(`Added remote ${name}`);
            break;

          case 'remove':
            if (!name) {
              throw new Error('Remote name is required');
            }
            await git.deleteRemote({ fs, dir, remote: name });
            logger.success(`Removed remote ${name}`);
            break;

          case undefined:
          case 'list':
            const remotes = await git.listRemotes({ fs, dir });
            for (const remote of remotes) {
              if (options.verbose) {
                logger.info(`${remote.remote}\t${remote.url}`);
              } else {
                logger.info(remote.remote);
              }
            }
            break;

          default:
            logger.error('Unknown command:', command);
        }
      } catch (error) {
        logger.error('Remote operation failed:', error);
      }
    });
}