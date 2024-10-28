import chalk from 'chalk';
var themes = {
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
var currentTheme = themes.default;
export function setupTheme(themeName) {
    if (themeName === void 0) { themeName = 'default'; }
    currentTheme = themes[themeName] || themes.default;
}
export function getTheme() {
    return currentTheme;
}
//# sourceMappingURL=theme.js.map