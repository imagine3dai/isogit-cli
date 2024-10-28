import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '../../test-repos/log-test');

describe('git log command', () => {
  beforeEach(async () => {
    await fs.promises.mkdir(testDir, { recursive: true });
    await git.init({ fs, dir: testDir });
  });

  afterEach(async () => {
    await fs.promises.rm(testDir, { recursive: true, force: true });
  });

  it('should show commit history', async () => {
    // Create multiple commits
    const testFile = path.join(testDir, 'test.txt');
    
    // First commit
    await fs.promises.writeFile(testFile, 'initial content');
    await git.add({ fs, dir: testDir, filepath: 'test.txt' });
    const commit1 = await git.commit({
      fs,
      dir: testDir,
      message: 'Initial commit',
      author: { name: 'Test', email: 'test@example.com' }
    });

    // Second commit
    await fs.promises.writeFile(testFile, 'updated content');
    await git.add({ fs, dir: testDir, filepath: 'test.txt' });
    const commit2 = await git.commit({
      fs,
      dir: testDir,
      message: 'Update content',
      author: { name: 'Test', email: 'test@example.com' }
    });

    const logs = await git.log({ fs, dir: testDir });
    expect(logs).toHaveLength(2);
    expect(logs[0].oid).toBe(commit2);
    expect(logs[1].oid).toBe(commit1);
  });

  it('should limit number of commits shown', async () => {
    // Create three commits
    const testFile = path.join(testDir, 'test.txt');
    
    for (let i = 1; i <= 3; i++) {
      await fs.promises.writeFile(testFile, `content ${i}`);
      await git.add({ fs, dir: testDir, filepath: 'test.txt' });
      await git.commit({
        fs,
        dir: testDir,
        message: `Commit ${i}`,
        author: { name: 'Test', email: 'test@example.com' }
      });
    }

    const logs = await git.log({ fs, dir: testDir, depth: 2 });
    expect(logs).toHaveLength(2);
  });
});