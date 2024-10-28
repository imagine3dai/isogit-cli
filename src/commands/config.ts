import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';

export function config(program: Command) {
  program
    .command('config')
    .description('Get and set repository or global options')
    .argument('[key]', 'Configuration key (e.g., user.name)')
    .argument('[value]', 'Configuration value')
    .option('-l, --list', 'List all configuration values')
    .option('--global', 'Use global config file')
    .action(async (key: string | undefined, value: string | undefined, options) => {
      try {
        const dir = await getRepoRoot();

        if (options.list) {
          const config = await git.listConfig({ fs, dir, path: options.global ? 'global' : undefined });
          for (const [key, value] of config.entries()) {
            logger.info(`${key}=${value}`);
          }
          return;
        }

        if (key && value) {
          await git.setConfig({
            fs,
            dir,
            path: key,
            value,
            level: options.global ? 'global' : 'local'
          });
          logger.success(`Set ${key}=${value}`);
        } else if (key) {
          const value = await git.getConfig({ fs, dir, path: key });
          if (value) {
            logger.info(value);
          } else {
            logger.error(`Config value not found for ${key}`);
          }
        }
      } catch (error) {
        logger.error('Config operation failed:', error);
      }
    });
}