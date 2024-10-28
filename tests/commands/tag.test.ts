import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '../../test-repos/tag-test');

describe('git tag command', () => {
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

  it('should create and list tags', async () => {
    const tagName = 'v1.0.0';
    const ref = await git.resolveRef({ fs, dir: testDir, ref: 'HEAD' });
    
    await git.tag({ fs, dir: testDir, ref, tag: tagName });
    const tags = await git.listTags({ fs, dir: testDir });

    expect(tags).toContain(tagName);
  });

  it('should delete tags', async () => {
    const tagName = 'v1.0.0';
    const ref = await git.resolveRef({ fs, dir: testDir, ref: 'HEAD' });
    
    await git.tag({ fs, dir: testDir, ref, tag: tagName });
    await git.deleteTag({ fs, dir: testDir, ref: tagName });
    
    const tags = await git.listTags({ fs, dir: testDir });
    expect(tags).not.toContain(tagName);
  });

  it('should create annotated tags', async () => {
    const tagName = 'v1.0.0';
    const message = 'Release v1.0.0';
    const ref = await git.resolveRef({ fs, dir: testDir, ref: 'HEAD' });
    
    await git.tag({
      fs,
      dir: testDir,
      ref,
      tag: tagName,
      message,
      object: { type: 'tag' }
    });

    const tags = await git.listTags({ fs, dir: testDir });
    expect(tags).toContain(tagName);
  });
});