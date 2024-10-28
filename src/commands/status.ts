import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';
import { getTheme } from '../utils/theme.js';

export function status(program: Command) {
  program
    .command('status')
    .description('Show the working tree status')
    .option('-s, --short', 'Give the output in the short-format')
    .action(async (options) => {
      try {
        const dir = await getRepoRoot();
        const theme = getTheme();
        const statusMatrix = await git.statusMatrix({ fs, dir });
        
        const currentBranch = await git.currentBranch({ fs, dir });
        logger.info(`On branch ${currentBranch}`);

        if (statusMatrix.length === 0) {
          logger.info('nothing to commit, working tree clean');
          return;
        }

        const staged: string[] = [];
        const notStaged: string[] = [];
        const untracked: string[] = [];

        for (const [filepath, head, workdir, stage] of statusMatrix) {
          if (head === 0 && workdir === 2 && stage == 0) {
            untracked.push(filepath);
          } else if (workdir === 2 && stage === 2) {
            staged.push(filepath);
          } else if (head === 1 && workdir === 2) {
            notStaged.push(filepath);
          }
        }

        if (staged.length > 0) {
          logger.info('\nChanges to be committed:');
          staged.forEach(file => logger.success(`\t${file}`));
        }

        if (notStaged.length > 0) {
          logger.info('\nChanges not staged for commit:');
          notStaged.forEach(file => logger.warning(`\t${file}`));
        }

        if (untracked.length > 0) {
          logger.info('\nUntracked files:');
          untracked.forEach(file => theme.secondary(`\t${file}`));
        }
      } catch (error) {
        logger.error('Failed to get status:', error);
      }
    });
}