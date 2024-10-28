import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';

export async function getRepoRoot(): Promise<string> {
  let dir = process.cwd();
  
  try {
    while (dir !== path.parse(dir).root) {
      if (await git.findRoot({ fs, filepath: dir })) {
        return dir;
      }
      dir = path.dirname(dir);
    }
    throw new Error('Not a git repository');
  } catch (error) {
    throw new Error('Not a git repository');
  }
}

export async function isRepo(dir: string): Promise<boolean> {
  try {
    await git.findRoot({ fs, filepath: dir });
    return true;
  } catch (error) {
    return false;
  }
}