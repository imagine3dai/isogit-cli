import { Command } from 'commander';
import git from 'isomorphic-git';
import fs from 'fs';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';

export function tag(program: Command) {
  program
    .command('tag')
    .description('Create, list, delete or verify a tag object')
    .argument('[tagname]', 'The name of the tag')
    .option('-a, --annotate', 'Make an unsigned, annotated tag object')
    .option('-m, --message <message>', 'Tag message')
    .option('-d, --delete', 'Delete a tag')
    .option('-l, --list', 'List tags')
    .action(async (tagname: string | undefined, options) => {
      try {
        const dir = await getRepoRoot();

        if (options.list || (!tagname && !options.delete)) {
          const tags = await git.listTags({ fs, dir });
          for (const tag of tags) {
            logger.info(tag);
          }
          return;
        }

        if (!tagname) {
          throw new Error('Tag name is required');
        }

        if (options.delete) {
          await git.deleteTag({ fs, dir, ref: tagname });
          logger.success(`Deleted tag ${tagname}`);
          return;
        }

        const ref = await git.resolveRef({ fs, dir, ref: 'HEAD' });
        await git.tag({
          fs,
          dir,
          ref,
          tag: tagname,
          message: options.message,
        });

        logger.success(`Created tag ${tagname}`);
      } catch (error) {
        logger.error('Tag operation failed:', error);
      }
    });
}