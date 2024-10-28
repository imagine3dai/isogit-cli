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
import { getTheme } from '../utils/theme.js';
export function status(program) {
    var _this = this;
    program
        .command('status')
        .description('Show the working tree status')
        .option('-s, --short', 'Give the output in the short-format')
        .action(function (options) { return __awaiter(_this, void 0, void 0, function () {
        var dir, theme_1, statusMatrix, currentBranch, staged, notStaged, untracked, _i, statusMatrix_1, _a, filepath, head, workdir, stage, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, getRepoRoot()];
                case 1:
                    dir = _b.sent();
                    theme_1 = getTheme();
                    return [4 /*yield*/, git.statusMatrix({ fs: fs, dir: dir })];
                case 2:
                    statusMatrix = _b.sent();
                    return [4 /*yield*/, git.currentBranch({ fs: fs, dir: dir })];
                case 3:
                    currentBranch = _b.sent();
                    logger.info("On branch ".concat(currentBranch));
                    if (statusMatrix.length === 0) {
                        logger.info('nothing to commit, working tree clean');
                        return [2 /*return*/];
                    }
                    staged = [];
                    notStaged = [];
                    untracked = [];
                    for (_i = 0, statusMatrix_1 = statusMatrix; _i < statusMatrix_1.length; _i++) {
                        _a = statusMatrix_1[_i], filepath = _a[0], head = _a[1], workdir = _a[2], stage = _a[3];
                        if (head === 0 && workdir === 2 && stage == 0) {
                            untracked.push(filepath);
                        }
                        else if (workdir === 2 && stage === 2) {
                            staged.push(filepath);
                        }
                        else if (head === 1 && workdir === 2) {
                            notStaged.push(filepath);
                        }
                    }
                    if (staged.length > 0) {
                        logger.info('\nChanges to be committed:');
                        staged.forEach(function (file) { return logger.success("\t".concat(file)); });
                    }
                    if (notStaged.length > 0) {
                        logger.info('\nChanges not staged for commit:');
                        notStaged.forEach(function (file) { return logger.warning("\t".concat(file)); });
                    }
                    if (untracked.length > 0) {
                        logger.info('\nUntracked files:');
                        untracked.forEach(function (file) { return theme_1.secondary("\t".concat(file)); });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    logger.error('Failed to get status:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
//# sourceMappingURL=status.js.map