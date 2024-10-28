import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';
import { getTheme } from '../utils/theme.js';

export function log(program: Command) {
  program
    .command('log')
    .description('Show commit logs')
    .option('-n, --max-count <number>', 'Limit the number of commits to output')
    .option('--oneline', 'Show commits in one line format')
    .action(async (options) => {
      try {
        const dir = await getRepoRoot();
        const theme = getTheme();
        
        const logs = await git.log({
          fs,
          dir,
          depth: options.maxCount ? parseInt(options.maxCount) : undefined
        });

        for (const commit of logs) {
          if (options.oneline) {
            logger.info(`${commit.oid.slice(0, 7)} ${commit.commit.message.split('\n')[0]}`);
          } else {
            theme.primary(`commit ${commit.oid}`);
            logger.info(`Author: ${commit.commit.author.name} <${commit.commit.author.email}>`);
            logger.info(`Date: ${new Date(commit.commit.author.timestamp * 1000).toISOString()}\n`);
            logger.info(`    ${commit.commit.message}\n`);
          }
        }
      } catch (error) {
        logger.error('Failed to show logs:', error);
      }
    });
}