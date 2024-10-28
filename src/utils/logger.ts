import chalk from 'chalk';

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(chalk.blue('info'), message, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(chalk.green('success'), message, ...args);
  },
  warning: (message: string, ...args: any[]) => {
    console.log(chalk.yellow('warning'), message, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(chalk.red('error'), message, ...args);
  }
};