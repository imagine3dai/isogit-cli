import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '../../test-repos/config-test');

describe('git config command', () => {
  beforeEach(async () => {
    await fs.promises.mkdir(testDir, { recursive: true });
    await git.init({ fs, dir: testDir });
  });

  afterEach(async () => {
    await fs.promises.rm(testDir, { recursive: true, force: true });
  });

  it('should set and get config values', async () => {
    const key = 'user.name';
    const value = 'Test User';

    await git.setConfig({ fs, dir: testDir, path: key, value });
    const result = await git.getConfig({ fs, dir: testDir, path: key });

    expect(result).toBe(value);
  });

  it('should list all config values', async () => {
    const configs = {
      'user.name': 'Test User',
      'user.email': 'test@example.com'
    };

    for (const [key, value] of Object.entries(configs)) {
      await git.setConfig({ fs, dir: testDir, path: key, value });
    }

    const list = await git.listConfig({ fs, dir: testDir });
    for (const [key, value] of Object.entries(configs)) {
      expect(list.get(key)).toBe(value);
    }
  });
});