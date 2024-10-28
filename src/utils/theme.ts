import chalk, { ChalkInstance } from 'chalk';

export interface Theme {
  primary: ChalkInstance;
  secondary: ChalkInstance;
  success: ChalkInstance;
  error: ChalkInstance;
  warning: ChalkInstance;
  info: ChalkInstance;
}

const themes: Record<string, Theme> = {
  default: {
    primary: chalk.blue,
    secondary: chalk.gray,
    success: chalk.green,
    error: chalk.red,
    warning: chalk.yellow,
    info: chalk.cyan
  },
  dark: {
    primary: chalk.white,
    secondary: chalk.gray,
    success: chalk.greenBright,
    error: chalk.redBright,
    warning: chalk.yellowBright,
    info: chalk.cyanBright
  }
};

let currentTheme: Theme = themes.default;

export function setupTheme(themeName: string = 'default') {
  currentTheme = themes[themeName] || themes.default;
}

export function getTheme(): Theme {
  return currentTheme;
}