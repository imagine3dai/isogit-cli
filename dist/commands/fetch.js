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
import http from 'isomorphic-git/http/web';
import { getRepoRoot } from '../utils/repo.js';
import { logger } from '../utils/logger.js';
export function fetch(program) {
    var _this = this;
    program
        .command('fetch')
        .description('Download objects and refs from another repository')
        .argument('[remote]', 'Remote to fetch from', 'origin')
        .option('--all', 'Fetch all remotes')
        .option('--prune', 'Remove any remote-tracking references that no longer exist on the remote')
        .option('--depth <depth>', 'Deepen or shorten the history by specified number of commits')
        .action(function (remote, options) { return __awaiter(_this, void 0, void 0, function () {
        var dir, remotes, _i, remotes_1, remote_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, getRepoRoot()];
                case 1:
                    dir = _a.sent();
                    if (!options.all) return [3 /*break*/, 7];
                    return [4 /*yield*/, git.listRemotes({ fs: fs, dir: dir })];
                case 2:
                    remotes = _a.sent();
                    _i = 0, remotes_1 = remotes;
                    _a.label = 3;
                case 3:
                    if (!(_i < remotes_1.length)) return [3 /*break*/, 6];
                    remote_1 = remotes_1[_i].remote;
                    logger.info("Fetching ".concat(remote_1, "..."));
                    return [4 /*yield*/, git.fetch({
                            fs: fs,
                            http: http,
                            dir: dir,
                            remote: remote_1,
                            prune: options.prune,
                            depth: options.depth ? parseInt(options.depth) : undefined
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    logger.info("Fetching ".concat(remote, "..."));
                    return [4 /*yield*/, git.fetch({
                            fs: fs,
                            http: http,
                            dir: dir,
                            remote: remote,
                            prune: options.prune,
                            depth: options.depth ? parseInt(options.depth) : undefined
                        })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    logger.success('Fetch completed successfully');
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    logger.error('Fetch failed:', error_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); });
}
//# sourceMappingURL=fetch.js.map