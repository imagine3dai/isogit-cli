import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '../../test-repos/branch-test');

describe('git branch command', () => {
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

  it('should create a new branch', async () => {
    const branchName = 'feature';
    await git.branch({ fs, dir: testDir, ref: branchName });
    
    const branches = await git.listBranches({ fs, dir: testDir });
    expect(branches).toContain(branchName);
  });

  it('should delete a branch', async () => {
    const branchName = 'feature';
    await git.branch({ fs, dir: testDir, ref: branchName });
    await git.deleteBranch({ fs, dir: testDir, ref: branchName });
    
    const branches = await git.listBranches({ fs, dir: testDir });
    expect(branches).not.toContain(branchName);
  });

  it('should list all branches', async () => {
    const branchNames = ['feature1', 'feature2'];
    
    for (const branch of branchNames) {
      await git.branch({ fs, dir: testDir, ref: branch });
    }
    
    const branches = await git.listBranches({ fs, dir: testDir });
    expect(branches).toContain('master');
    expect(branches).toContain('feature1');
    expect(branches).toContain('feature2');
  });
});