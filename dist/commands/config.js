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
import git from 'isomorphic-git';
import fs from 'fs';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';
export function config(program) {
    var _this = this;
    program
        .command('config')
        .description('Get and set repository or global options')
        .argument('[key]', 'Configuration key (e.g., user.name)')
        .argument('[value]', 'Configuration value')
        .option('-l, --list', 'List all configuration values')
        .option('--global', 'Use global config file')
        .action(function (key, value, options) { return __awaiter(_this, void 0, void 0, function () {
        var dir, config_1, _i, _a, _b, key_1, value_1, value_2, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, getRepoRoot()];
                case 1:
                    dir = _c.sent();
                    if (!options.list) return [3 /*break*/, 3];
                    return [4 /*yield*/, git.listConfig({ fs: fs, dir: dir, path: options.global ? 'global' : undefined })];
                case 2:
                    config_1 = _c.sent();
                    for (_i = 0, _a = config_1.entries(); _i < _a.length; _i++) {
                        _b = _a[_i], key_1 = _b[0], value_1 = _b[1];
                        logger.info("".concat(key_1, "=").concat(value_1));
                    }
                    return [2 /*return*/];
                case 3:
                    if (!(key && value)) return [3 /*break*/, 5];
                    return [4 /*yield*/, git.setConfig({
                            fs: fs,
                            dir: dir,
                            path: key,
                            value: value,
                            level: options.global ? 'global' : 'local'
                        })];
                case 4:
                    _c.sent();
                    logger.success("Set ".concat(key, "=").concat(value));
                    return [3 /*break*/, 7];
                case 5:
                    if (!key) return [3 /*break*/, 7];
                    return [4 /*yield*/, git.getConfig({ fs: fs, dir: dir, path: key })];
                case 6:
                    value_2 = _c.sent();
                    if (value_2) {
                        logger.info(value_2);
                    }
                    else {
                        logger.error("Config value not found for ".concat(key));
                    }
                    _c.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _c.sent();
                    logger.error('Config operation failed:', error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); });
}
//# sourceMappingURL=config.js.map