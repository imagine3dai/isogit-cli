import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '../../test-repos/status-test');

describe('git status command', () => {
  beforeEach(async () => {
    await fs.promises.mkdir(testDir, { recursive: true });
    await git.init({ fs, dir: testDir });
  });

  afterEach(async () => {
    await fs.promises.rm(testDir, { recursive: true, force: true });
  });

  it('should show clean working directory for new repo', async () => {
    const statusMatrix = await git.statusMatrix({ fs, dir: testDir });
    expect(statusMatrix.length).toBe(0);
  });

  it('should detect untracked files', async () => {
    const testFile = path.join(testDir, 'untracked.txt');
    await fs.promises.writeFile(testFile, 'untracked content');
    
    const statusMatrix = await git.statusMatrix({ fs, dir: testDir });
    const [filepath, head, workdir, stage] = statusMatrix[0];
    
    expect(filepath).toBe('untracked.txt');
    expect(head).toBe(0); // not in HEAD
    expect(workdir).toBe(2); // exists in working dir
    expect(stage).toBe(0); // not in staging
  });

  it('should detect staged files', async () => {
    const testFile = path.join(testDir, 'staged.txt');
    await fs.promises.writeFile(testFile, 'staged content');
    await git.add({ fs, dir: testDir, filepath: 'staged.txt' });
    
    const statusMatrix = await git.statusMatrix({ fs, dir: testDir });
    const [filepath, head, workdir, stage] = statusMatrix[0];
    
    expect(filepath).toBe('staged.txt');
    expect(head).toBe(0); // not in HEAD
    expect(workdir).toBe(2); // exists in working dir
    expect(stage).toBe(2); // exists in staging
  });
});