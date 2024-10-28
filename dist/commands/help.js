var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getTheme } from '../utils/theme.js';
import { logger } from '../utils/logger.js';
var categories = [
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
var commonUses = [
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
export function help(program) {
    var _this = this;
    program
        .command('help')
        .description('Display help information about Git commands')
        .argument('[command]', 'Command to show help for')
        .action(function (commandName) { return __awaiter(_this, void 0, void 0, function () {
        var theme;
        return __generator(this, function (_a) {
            theme = getTheme();
            if (commandName) {
                showCommandHelp(commandName, theme);
            }
            else {
                showGeneralHelp(theme);
            }
            return [2 /*return*/];
        });
    }); });
}
function showGeneralHelp(theme) {
    logger.info('\nUsage: igit <command> [options]\n');
    logger.info('Common Uses:\n');
    for (var _i = 0, commonUses_1 = commonUses; _i < commonUses_1.length; _i++) {
        var use = commonUses_1[_i];
        theme.primary("\n".concat(use.title, ":"));
        for (var _a = 0, _b = use.steps; _a < _b.length; _a++) {
            var step = _b[_a];
            logger.info("  ".concat(step.command));
            theme.secondary("    ".concat(step.description));
        }
    }
    logger.info('\nAvailable Commands:\n');
    for (var _c = 0, categories_1 = categories; _c < categories_1.length; _c++) {
        var category = categories_1[_c];
        theme.primary("\n".concat(category.name, ":"));
        theme.secondary("  ".concat(category.description));
        for (var _d = 0, _e = category.commands; _d < _e.length; _d++) {
            var command = _e[_d];
            logger.info("\n  ".concat(command.name));
            theme.secondary("    ".concat(command.description));
        }
    }
    logger.info('\nFor more details on a specific command: igit help <command>\n');
}
function showCommandHelp(commandName, theme) {
    var command = findCommand(commandName);
    if (!command) {
        logger.error("No help found for command '".concat(commandName, "'"));
        return;
    }
    theme.primary("\n".concat(command.name, " - ").concat(command.description, "\n"));
    logger.info("Usage: ".concat(command.usage, "\n"));
    if (command.examples.length > 0) {
        logger.info('Examples:');
        for (var _i = 0, _a = command.examples; _i < _a.length; _i++) {
            var example = _a[_i];
            theme.secondary("\n  ".concat(example.description, ":"));
            logger.info("  $ ".concat(example.command));
            if (example.output) {
                theme.secondary("  ".concat(example.output));
            }
        }
    }
    if (command.notes) {
        logger.info('\nNotes:');
        for (var _b = 0, _c = command.notes; _b < _c.length; _b++) {
            var note = _c[_b];
            theme.secondary("  ".concat(note));
        }
    }
    logger.info('');
}
function findCommand(name) {
    for (var _i = 0, categories_2 = categories; _i < categories_2.length; _i++) {
        var category = categories_2[_i];
        var command = category.commands.find(function (cmd) { return cmd.name === name; });
        if (command)
            return command;
    }
    return undefined;
}
//# sourceMappingURL=help.js.map