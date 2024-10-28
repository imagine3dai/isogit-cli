import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '../../test-repos/checkout-test');

describe('git checkout command', () => {
  beforeEach(async () => {
    await fs.promises.mkdir(testDir, { recursive: true });
    await git.init({ fs, dir: testDir });
    
    // Create initial commit
    const testFile = path.join(testDir, 'test.txt');
    await fs.promises.writeFile(testFile, 'test content');
    await git.add({ fs, dir: testDir, filepath: 'test.txt' });
    await git.commit({
      fs,
      dir: testDir,
      message: 'Initial commit',
      author: { name: 'Test', email: 'test@example.com' }
    });
  });

  afterEach(async () => {
    await fs.promises.rm(testDir, { recursive: true, force: true });
  });

  it('should checkout an existing branch', async () => {
    await git.branch({ fs, dir: testDir, ref: 'feature' });
    await git.checkout({ fs, dir: testDir, ref: 'feature' });
    
    const currentBranch = await git.currentBranch({ fs, dir: testDir });
    expect(currentBranch).toBe('feature');
  });

  it('should create and checkout a new branch', async () => {
    const branchName = 'new-feature';
    await git.branch({ fs, dir: testDir, ref: branchName });
    await git.checkout({ fs, dir: testDir, ref: branchName });
    
    const currentBranch = await git.currentBranch({ fs, dir: testDir });
    expect(currentBranch).toBe(branchName);
  });

  it('should force checkout and discard changes', async () => {
    const testFile = path.join(testDir, 'test.txt');
    await fs.promises.writeFile(testFile, 'modified content');
    
    await git.checkout({
      fs,
      dir: testDir,
      ref: 'master',
      force: true
    });

    const content = await fs.promises.readFile(testFile, 'utf8');
    expect(content).toBe('test content');
  });
});