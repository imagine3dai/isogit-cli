import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '../../test-repos/commit-test');

describe('git commit command', () => {
  beforeEach(async () => {
    await fs.promises.mkdir(testDir, { recursive: true });
    await git.init({ fs, dir: testDir });
    
    // Configure test user
    await git.setConfig({
      fs,
      dir: testDir,
      path: 'user.name',
      value: 'Test User'
    });
    await git.setConfig({
      fs,
      dir: testDir,
      path: 'user.email',
      value: 'test@example.com'
    });
  });

  afterEach(async () => {
    await fs.promises.rm(testDir, { recursive: true, force: true });
  });

  it('should create a commit with staged changes', async () => {
    const testFile = path.join(testDir, 'test.txt');
    await fs.promises.writeFile(testFile, 'test content');
    await git.add({ fs, dir: testDir, filepath: 'test.txt' });
    
    const commitOid = await git.commit({
      fs,
      dir: testDir,
      message: 'Test commit\n',
      author: {
        name: 'Test User',
        email: 'test@example.com'
      }
    });

    const log = await git.log({ fs, dir: testDir, depth: 1 });
    expect(log[0].oid).toBe(commitOid);
    expect(log[0].commit.message).toBe('Test commit\n');
  });

  it('should amend previous commit', async () => {
    // Create initial commit
    const testFile = path.join(testDir, 'test.txt');
    await fs.promises.writeFile(testFile, 'test content');
    await git.add({ fs, dir: testDir, filepath: 'test.txt' });
    const initialCommit = await git.commit({
      fs,
      dir: testDir,
      message: 'Initial commit',
      author: {
        name: 'Test User',
        email: 'test@example.com'
      }
    });

    // Amend commit
    const amendedCommit = await git.commit({
      fs,
      dir: testDir,
      message: 'Amended commit\n',
      author: {
        name: 'Test User',
        email: 'test@example.com'
      },
      amend: true
    });

    const log = await git.log({ fs, dir: testDir, depth: 1 });
    expect(log[0].oid).toBe(amendedCommit);
    expect(log[0].oid).not.toBe(initialCommit);
    expect(log[0].commit.message).toBe('Amended commit\n');
  });
});