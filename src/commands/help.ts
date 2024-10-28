import { Command } from 'commander';
import { getTheme } from '../utils/theme.js';
import { logger } from '../utils/logger.js';

interface CommandCategory {
  name: string;
  description: string;
  commands: CommandInfo[];
}

interface CommandInfo {
  name: string;
  description: string;
  usage: string;
  examples: Example[];
  notes?: string[];
}

interface Example {
  description: string;
  command: string;
  output?: string;
}

const categories: CommandCategory[] = [
  {
    name: 'Getting and Creating Projects',
    description: 'Commands for starting new repositories and obtaining existing ones',
    commands: [
      {
        name: 'init',
        description: 'Create an empty Git repository or reinitialize an existing one',
        usage: 'igit init [--bare] [--initial-branch <name>]',
        examples: [
          {
            description: 'Initialize a new repository',
            command: 'igit init',
            output: 'Initialized Git repository in /path/to/repo'
          },
          {
            description: 'Initialize with custom branch name',
            command: 'igit init --initial-branch main',
            output: 'Initialized Git repository in /path/to/repo'
          }
        ]
      },
      {
        name: 'clone',
        description: 'Clone a repository into a new directory',
        usage: 'igit clone <url> [directory] [-b <branch>] [--depth <depth>]',
        examples: [
          {
            description: 'Clone a repository',
            command: 'igit clone https://github.com/user/repo.git',
            output: 'Cloning into \'repo\'...\nClone completed successfully'
          }
        ]
      }
    ]
  },
  {
    name: 'Basic Snapshotting',
    description: 'Commands for working with basic Git workflow',
    commands: [
      {
        name: 'add',
        description: 'Add file contents to the index',
        usage: 'igit add [<pathspec>...] [-A] [-u]',
        examples: [
          {
            description: 'Add specific files',
            command: 'igit add file1.txt file2.txt',
            output: 'Added file1.txt to the index\nAdded file2.txt to the index'
          },
          {
            description: 'Add all changes',
            command: 'igit add -A',
            output: 'Added all changes to the index'
          }
        ]
      },
      {
        name: 'status',
        description: 'Show the working tree status',
        usage: 'igit status [-s]',
        examples: [
          {
            description: 'Show current status',
            command: 'igit status',
            output: 'On branch main\nChanges to be committed:\n\tmodified: file1.txt'
          }
        ]
      },
      {
        name: 'commit',
        description: 'Record changes to the repository',
        usage: 'igit commit -m <message> [-a] [--amend]',
        examples: [
          {
            description: 'Create a commit',
            command: 'igit commit -m "Add new feature"',
            output: '[a1b2c3d] Add new feature'
          }
        ]
      }
    ]
  },
  {
    name: 'Branching and Merging',
    description: 'Commands for working with branches',
    commands: [
      {
        name: 'branch',
        description: 'List, create, or delete branches',
        usage: 'igit branch [<branchname>] [-d] [-l]',
        examples: [
          {
            description: 'Create a new branch',
            command: 'igit branch feature',
            output: 'Created branch feature'
          },
          {
            description: 'List all branches',
            command: 'igit branch',
            output: '* main\n  feature'
          }
        ]
      },
      {
        name: 'checkout',
        description: 'Switch branches or restore working tree files',
        usage: 'igit checkout <branch> [-b] [-f]',
        examples: [
          {
            description: 'Switch to a branch',
            command: 'igit checkout feature',
            output: 'Switched to branch \'feature\''
          }
        ]
      }
    ]
  },
  {
    name: 'Sharing and Updating',
    description: 'Commands for working with remote repositories',
    commands: [
      {
        name: 'fetch',
        description: 'Download objects and refs from another repository',
        usage: 'igit fetch [<remote>] [--all] [--prune]',
        examples: [
          {
            description: 'Fetch from origin',
            command: 'igit fetch origin',
            output: 'Fetching origin...\nFetch completed successfully'
          }
        ]
      },
      {
        name: 'pull',
        description: 'Fetch from and integrate with another repository',
        usage: 'igit pull [<remote>] [<branch>]',
        examples: [
          {
            description: 'Pull from origin',
            command: 'igit pull origin main',
            output: 'Pulling from origin/main...\nPull completed successfully'
          }
        ]
      },
      {
        name: 'push',
        description: 'Update remote refs along with associated objects',
        usage: 'igit push [<remote>] [<branch>] [-f] [--tags]',
        examples: [
          {
            description: 'Push to origin',
            command: 'igit push origin main',
            output: 'Pushing to origin/main...\nPush completed successfully'
          }
        ]
      }
    ]
  }
];

const commonUses = [
  {
    title: 'Initialize a new project',
    steps: [
      { command: 'igit init', description: 'Create a new repository' },
      { command: 'igit add .', description: 'Add all files' },
      { command: 'igit commit -m "Initial commit"', description: 'Create first commit' }
    ]
  },
  {
    title: 'Work with branches',
    steps: [
      { command: 'igit branch feature', description: 'Create a feature branch' },
      { command: 'igit checkout feature', description: 'Switch to the branch' },
      { command: 'igit push -u origin feature', description: 'Push branch to remote' }
    ]
  },
  {
    title: 'Update from remote',
    steps: [
      { command: 'igit fetch origin', description: 'Get latest changes' },
      { command: 'igit pull origin main', description: 'Update local main branch' }
    ]
  }
];

export function help(program: Command) {
  program
    .command('help')
    .description('Display help information about Git commands')
    .argument('[command]', 'Command to show help for')
    .action(async (commandName?: string) => {
      const theme = getTheme();

      if (commandName) {
        showCommandHelp(commandName, theme);
      } else {
        showGeneralHelp(theme);
      }
    });
}

function showGeneralHelp(theme: any) {
  logger.info('\nUsage: igit <command> [options]\n');

  logger.info('Common Uses:\n');
  for (const use of commonUses) {
    theme.primary(`\n${use.title}:`);
    for (const step of use.steps) {
      logger.info(`  ${step.command}`);
      theme.secondary(`    ${step.description}`);
    }
  }

  logger.info('\nAvailable Commands:\n');
  for (const category of categories) {
    theme.primary(`\n${category.name}:`);
    theme.secondary(`  ${category.description}`);
    for (const command of category.commands) {
      logger.info(`\n  ${command.name}`);
      theme.secondary(`    ${command.description}`);
    }
  }

  logger.info('\nFor more details on a specific command: igit help <command>\n');
}

function showCommandHelp(commandName: string, theme: any) {
  const command = findCommand(commandName);
  
  if (!command) {
    logger.error(`No help found for command '${commandName}'`);
    return;
  }

  theme.primary(`\n${command.name} - ${command.description}\n`);
  logger.info(`Usage: ${command.usage}\n`);

  if (command.examples.length > 0) {
    logger.info('Examples:');
    for (const example of command.examples) {
      theme.secondary(`\n  ${example.description}:`);
      logger.info(`  $ ${example.command}`);
      if (example.output) {
        theme.secondary(`  ${example.output}`);
      }
    }
  }

  if (command.notes) {
    logger.info('\nNotes:');
    for (const note of command.notes) {
      theme.secondary(`  ${note}`);
    }
  }

  logger.info('');
}

function findCommand(name: string): CommandInfo | undefined {
  for (const category of categories) {
    const command = category.commands.find(cmd => cmd.name === name);
    if (command) return command;
  }
  return undefined;
}