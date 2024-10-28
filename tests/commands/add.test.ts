import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '../../test-repos/add-test');

describe('git add command', () => {
  beforeEach(async () => {
    // Setup test repository
    await fs.promises.mkdir(testDir, { recursive: true });
    await git.init({ fs, dir: testDir });
  });

  afterEach(async () => {
    // Cleanup test repository
    await fs.promises.rm(testDir, { recursive: true, force: true });
  });

  it('should add a single file to the index', async () => {
    const testFile = path.join(testDir, 'test.txt');
    await fs.promises.writeFile(testFile, 'test content');
    
    await git.add({ fs, dir: testDir, filepath: 'test.txt' });
    
    const status = await git.status({ fs, dir: testDir, filepath: 'test.txt' });
    expect(status).toBe('added');
  });

  it('should add multiple files to the index', async () => {
    const files = ['test1.txt', 'test2.txt'];
    
    for (const file of files) {
      await fs.promises.writeFile(
        path.join(testDir, file),
        `content of ${file}`
      );
    }
    
    for (const file of files) {
      await git.add({ fs, dir: testDir, filepath: file });
      const status = await git.status({ fs, dir: testDir, filepath: file });
      expect(status).toBe('added');
    }
  });
});