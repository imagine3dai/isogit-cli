import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '../../test-repos/init-test');

describe('git init command', () => {
  beforeEach(async () => {
    await fs.promises.mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    await fs.promises.rm(testDir, { recursive: true, force: true });
  });

  it('should initialize a new repository', async () => {
    await git.init({ fs, dir: testDir });
    const isRepo = await git.findRoot({ fs, filepath: testDir });
    expect(isRepo).toBe(testDir);
  });

  it('should initialize with custom initial branch', async () => {
    await git.init({ fs, dir: testDir, defaultBranch: 'develop' });
    const branch = await git.currentBranch({ fs, dir: testDir });
    expect(branch).toBe('develop');
  });

  it('should initialize a bare repository', async () => {
    await git.init({ fs, dir: testDir, bare: true });
    const config = await git.getConfig({
      fs,
      dir: testDir,
      path: 'core.bare'
    });
    expect(config).toBe('true');
  });
});