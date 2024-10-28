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
export function remote(program) {
    var _this = this;
    program
        .command('remote')
        .description('Manage set of tracked repositories')
        .argument('[command]', 'Command to execute (add, remove, list)')
        .argument('[name]', 'Remote name')
        .argument('[url]', 'Remote URL')
        .option('-v, --verbose', 'Be verbose')
        .action(function (command, name, url, options) { return __awaiter(_this, void 0, void 0, function () {
        var dir, _a, remotes, _i, remotes_1, remote_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, getRepoRoot()];
                case 1:
                    dir = _b.sent();
                    _a = command;
                    switch (_a) {
                        case 'add': return [3 /*break*/, 2];
                        case 'remove': return [3 /*break*/, 4];
                        case undefined: return [3 /*break*/, 6];
                        case 'list': return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 8];
                case 2:
                    if (!name || !url) {
                        throw new Error('Remote name and URL are required');
                    }
                    return [4 /*yield*/, git.addRemote({ fs: fs, dir: dir, remote: name, url: url })];
                case 3:
                    _b.sent();
                    logger.success("Added remote ".concat(name));
                    return [3 /*break*/, 9];
                case 4:
                    if (!name) {
                        throw new Error('Remote name is required');
                    }
                    return [4 /*yield*/, git.deleteRemote({ fs: fs, dir: dir, remote: name })];
                case 5:
                    _b.sent();
                    logger.success("Removed remote ".concat(name));
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, git.listRemotes({ fs: fs, dir: dir })];
                case 7:
                    remotes = _b.sent();
                    for (_i = 0, remotes_1 = remotes; _i < remotes_1.length; _i++) {
                        remote_1 = remotes_1[_i];
                        if (options.verbose) {
                            logger.info("".concat(remote_1.remote, "\t").concat(remote_1.url));
                        }
                        else {
                            logger.info(remote_1.remote);
                        }
                    }
                    return [3 /*break*/, 9];
                case 8:
                    logger.error('Unknown command:', command);
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _b.sent();
                    logger.error('Remote operation failed:', error_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); });
}
//# sourceMappingURL=remote.js.map