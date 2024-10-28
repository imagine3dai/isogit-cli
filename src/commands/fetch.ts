import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import http from 'isomorphic-git/http/web';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';

export function fetch(program: Command) {
  program
    .command('fetch')
    .description('Download objects and refs from another repository')
    .argument('[remote]', 'Remote to fetch from', 'origin')
    .option('--all', 'Fetch all remotes')
    .option('--prune', 'Remove any remote-tracking references that no longer exist on the remote')
    .option('--depth <depth>', 'Deepen or shorten the history by specified number of commits')
    .action(async (remote: string, options) => {
      try {
        const dir = await getRepoRoot();

        if (options.all) {
          const remotes = await git.listRemotes({ fs, dir });
          for (const { remote } of remotes) {
            logger.info(`Fetching ${remote}...`);
            await git.fetch({
              fs,
              http,
              dir,
              remote,
              prune: options.prune,
              depth: options.depth ? parseInt(options.depth) : undefined
            });
          }
        } else {
          logger.info(`Fetching ${remote}...`);
          await git.fetch({
            fs,
            http,
            dir,
            remote,
            prune: options.prune,
            depth: options.depth ? parseInt(options.depth) : undefined
          });
        }
        
        logger.success('Fetch completed successfully');
      } catch (error) {
        logger.error('Fetch failed:', error);
      }
    });
}