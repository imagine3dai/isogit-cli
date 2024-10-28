# igit - Isomorphic Git CLI

A complete Git CLI implementation using isomorphic-git, written in TypeScript.

## Features

- Full Git command support
- TypeScript implementation
- Comprehensive test suite
- Detailed help system with themes
- Modern async/await API

## Installation

```bash
npm install -g igit
```

## Usage

```bash
igit <command> [options]
```

## Supported Commands

- `add` - Add file contents to the index
- `branch` - List, create, or delete branches
- `checkout` - Switch branches or restore working tree files
- `clone` - Clone a repository into a new directory
- `commit` - Record changes to the repository
- `config` - Get and set repository or global options
- `fetch` - Download objects and refs from another repository
- `help` - Display help information
- `init` - Create an empty Git repository
- `log` - Show commit logs
- `pull` - Fetch from and integrate with another repository
- `push` - Update remote refs along with associated objects
- `remote` - Manage set of tracked repositories
- `status` - Show the working tree status
- `tag` - Create, list, delete or verify a tag object

## Examples

Initialize a new repository:
```bash
igit init
```

Clone a repository:
```bash
igit clone https://github.com/user/repo.git
```

Add files:
```bash
igit add .
```

Commit changes:
```bash
igit commit -m "Initial commit"
```

## License

MIT License - see LICENSE file for details