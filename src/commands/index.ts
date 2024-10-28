import { Command } from 'commander';
import { add } from './add.js';
import { branch } from './branch.js';
import { checkout } from './checkout.js';
import { clone } from './clone.js';
import { commit } from './commit.js';
import { config } from './config.js';
import { fetch } from './fetch.js';
import { help } from './help.js';
import { init } from './init.js';
import { log } from './log.js';
import { pull } from './pull.js';
import { push } from './push.js';
import { remote } from './remote.js';
import { status } from './status.js';
import { tag } from './tag.js';

export async function loadCommands(program: Command) {
  add(program);
  branch(program);
  checkout(program);
  clone(program);
  commit(program);
  config(program);
  fetch(program);
  help(program);
  init(program);
  log(program);
  pull(program);
  push(program);
  remote(program);
  status(program);
  tag(program);
}