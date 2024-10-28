import { ChalkInstance } from 'chalk';
export interface Theme {
    primary: ChalkInstance;
    secondary: ChalkInstance;
    success: ChalkInstance;
    error: ChalkInstance;
    warning: ChalkInstance;
    info: ChalkInstance;
}
export declare function setupTheme(themeName?: string): void;
export declare function getTheme(): Theme;
