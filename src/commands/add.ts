import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';

export function add(program: Command) {
  program
    .command('add')
    .description('Add file contents to the index')
    .argument('[paths...]', 'Files to add content from')
    .option('-A, --all', 'Add all tracked and untracked files')
    .option('-u, --update', 'Update tracked files')
    .action(async (paths: string[], options) => {
      try {
        const dir = await getRepoRoot();
        
        if (options.all) {
          const status = await git.statusMatrix({ fs, dir });
          for (const [filepath] of status) {
            await git.add({ fs, dir, filepath });
          }
          logger.success('Added all changes to the index');
          return;
        }

        if (paths.length === 0 && !options.update) {
          logger.error('Nothing specified, nothing added.');
          logger.info('Maybe you wanted to say "git add ."?');
          return;
        }

        for (const filepath of paths) {
          await git.add({ fs, dir, filepath });
          logger.success(`Added ${filepath} to the index`);
        }
      } catch (error) {
        logger.error('Failed to add files:', error);
      }
    });
}