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
export function branch(program) {
    var _this = this;
    program
        .command('branch')
        .description('List, create, or delete branches')
        .argument('[branchName]', 'The name of the branch to create')
        .option('-d, --delete', 'Delete a branch')
        .option('-l, --list', 'List all branches')
        .option('-r, --remote', 'List or delete remote-tracking branches')
        .action(function (branchName, options) { return __awaiter(_this, void 0, void 0, function () {
        var dir, branches, currentBranch, _i, branches_1, branch_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, getRepoRoot()];
                case 1:
                    dir = _a.sent();
                    if (!(options.list || (!branchName && !options.delete))) return [3 /*break*/, 4];
                    return [4 /*yield*/, git.listBranches({ fs: fs, dir: dir })];
                case 2:
                    branches = _a.sent();
                    return [4 /*yield*/, git.currentBranch({ fs: fs, dir: dir })];
                case 3:
                    currentBranch = _a.sent();
                    for (_i = 0, branches_1 = branches; _i < branches_1.length; _i++) {
                        branch_1 = branches_1[_i];
                        if (branch_1 === currentBranch) {
                            logger.info("* ".concat(branch_1));
                        }
                        else {
                            logger.info("  ".concat(branch_1));
                        }
                    }
                    return [2 /*return*/];
                case 4:
                    if (!(options.delete && branchName)) return [3 /*break*/, 6];
                    return [4 /*yield*/, git.deleteBranch({ fs: fs, dir: dir, ref: branchName })];
                case 5:
                    _a.sent();
                    logger.success("Deleted branch ".concat(branchName));
                    return [2 /*return*/];
                case 6:
                    if (!branchName) return [3 /*break*/, 8];
                    return [4 /*yield*/, git.branch({ fs: fs, dir: dir, ref: branchName })];
                case 7:
                    _a.sent();
                    logger.success("Created branch ".concat(branchName));
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    logger.error('Branch operation failed:', error_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
//# sourceMappingURL=branch.js.map