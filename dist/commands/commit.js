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
export function commit(program) {
    var _this = this;
    program
        .command('commit')
        .description('Record changes to the repository')
        .option('-m, --message <message>', 'Use the given message as the commit message')
        .option('-a, --all', 'Automatically stage files that have been modified and deleted')
        .option('--amend', 'Amend previous commit')
        .action(function (options) { return __awaiter(_this, void 0, void 0, function () {
        var dir, status_2, _i, status_1, _a, filepath, workdir, author, commitOid, error_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, getRepoRoot()];
                case 1:
                    dir = _c.sent();
                    if (!options.message) {
                        logger.error('Please provide a commit message using -m or --message');
                        return [2 /*return*/];
                    }
                    if (!options.all) return [3 /*break*/, 6];
                    return [4 /*yield*/, git.statusMatrix({ fs: fs, dir: dir })];
                case 2:
                    status_2 = _c.sent();
                    _i = 0, status_1 = status_2;
                    _c.label = 3;
                case 3:
                    if (!(_i < status_1.length)) return [3 /*break*/, 6];
                    _a = status_1[_i], filepath = _a[0], workdir = _a[2];
                    if (!(workdir === 2)) return [3 /*break*/, 5];
                    return [4 /*yield*/, git.add({ fs: fs, dir: dir, filepath: filepath })];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    _b = {};
                    return [4 /*yield*/, git.getConfig({ fs: fs, dir: dir, path: 'user.name' })];
                case 7:
                    _b.name = (_c.sent()) || 'Unknown';
                    return [4 /*yield*/, git.getConfig({ fs: fs, dir: dir, path: 'user.email' })];
                case 8:
                    author = (_b.email = (_c.sent()) || 'unknown@example.com',
                        _b);
                    return [4 /*yield*/, git.commit({
                            fs: fs,
                            dir: dir,
                            message: options.message,
                            author: author,
                            amend: options.amend
                        })];
                case 9:
                    commitOid = _c.sent();
                    logger.success("[".concat(commitOid, "] ").concat(options.message));
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _c.sent();
                    logger.error('Commit failed:', error_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); });
}
//# sourceMappingURL=commit.js.map