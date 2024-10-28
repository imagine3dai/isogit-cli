import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '../../test-repos/remote-test');

describe('git remote command', () => {
  beforeEach(async () => {
    await fs.promises.mkdir(testDir, { recursive: true });
    await git.init({ fs, dir: testDir });
  });

  afterEach(async () => {
    await fs.promises.rm(testDir, { recursive: true, force: true });
  });

  it('should add and list remotes', async () => {
    const remote = 'origin';
    const url = 'https://github.com/user/repo.git';

    await git.addRemote({ fs, dir: testDir, remote, url });
    const remotes = await git.listRemotes({ fs, dir: testDir });

    expect(remotes).toHaveLength(1);
    expect(remotes[0].remote).toBe(remote);
    expect(remotes[0].url).toBe(url);
  });

  it('should remove remotes', async () => {
    const remote = 'origin';
    const url = 'https://github.com/user/repo.git';

    await git.addRemote({ fs, dir: testDir, remote, url });
    await git.deleteRemote({ fs, dir: testDir, remote });
    
    const remotes = await git.listRemotes({ fs, dir: testDir });
    expect(remotes).toHaveLength(0);
  });
});