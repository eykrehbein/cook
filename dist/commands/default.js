"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var filesystem_1 = require("../utils/filesystem");
var console_1 = require("../utils/console");
exports.default = (function (input, flags) { return __awaiter(void 0, void 0, void 0, function () {
    var boilerplateName, targetDir, tree, variables, regexName, regexContent, _i, _a, treeItem, regexExecOnName, varName, regexMatchOnContent, _b, regexMatchOnContent_1, item, splitItem, varName, filledVariables, blankVariableNames, _c, filledVariables_1, v, promptResponse, _resKeys, _d, filledVariables_2, item, getVar, _e, variables_1, v, regex, _f, _g, treeItem, _h, variables_2, v, regex, _j, _k, treeItem, collides, confirmed;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                boilerplateName = input[0];
                targetDir = input[1];
                if (typeof targetDir === 'undefined') {
                    targetDir = process.cwd();
                }
                else {
                    targetDir = path_1.default.join(process.cwd(), targetDir);
                }
                // check if name is valid
                if (typeof boilerplateName === 'undefined') {
                    console.error(chalk_1.default.red('No name defined'));
                    process.exit(1);
                }
                tree = filesystem_1.GetBoilerplateContentPaths(boilerplateName);
                if (tree === null) {
                    console.log(chalk_1.default.red('Boilerplate not found'));
                    process.exit(1);
                }
                variables = [];
                regexName = new RegExp('{{(.*?)}}', 'gm');
                regexContent = /c{{(.*?)}}/gim;
                for (_i = 0, _a = tree; _i < _a.length; _i++) {
                    treeItem = _a[_i];
                    regexExecOnName = regexName.exec(treeItem.pathString);
                    if (regexExecOnName !== null) {
                        varName = regexExecOnName[1].trimLeft().trimRight();
                        if (!variables.includes(varName)) {
                            variables.push(varName);
                        }
                    }
                    if (!treeItem.isDir) {
                        regexMatchOnContent = treeItem.content.match(regexContent);
                        if (regexMatchOnContent !== null) {
                            for (_b = 0, regexMatchOnContent_1 = regexMatchOnContent; _b < regexMatchOnContent_1.length; _b++) {
                                item = regexMatchOnContent_1[_b];
                                splitItem = item;
                                varName = splitItem
                                    .split('c{{')[1]
                                    .split('}}')[0]
                                    .trimLeft()
                                    .trimRight();
                                if (!variables.includes(varName)) {
                                    variables.push(varName);
                                }
                            }
                        }
                    }
                }
                filledVariables = variables.map(function (varString) {
                    return { name: varString, value: flags[varString] || '' };
                });
                blankVariableNames = [];
                for (_c = 0, filledVariables_1 = filledVariables; _c < filledVariables_1.length; _c++) {
                    v = filledVariables_1[_c];
                    if (v.value === '') {
                        blankVariableNames.push(v.name);
                    }
                }
                if (!(blankVariableNames.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, console_1.PromptForVariables(blankVariableNames)];
            case 1:
                promptResponse = _l.sent();
                _resKeys = Object.keys(promptResponse);
                for (_d = 0, filledVariables_2 = filledVariables; _d < filledVariables_2.length; _d++) {
                    item = filledVariables_2[_d];
                    if (_resKeys.includes(item.name)) {
                        item.value = promptResponse[item.name];
                    }
                }
                _l.label = 2;
            case 2:
                getVar = function (name) {
                    for (var _i = 0, filledVariables_3 = filledVariables; _i < filledVariables_3.length; _i++) {
                        var item = filledVariables_3[_i];
                        if (item.name === name) {
                            return item.value;
                        }
                    }
                    return '';
                };
                // replace all variables inside of file and folder names
                for (_e = 0, variables_1 = variables; _e < variables_1.length; _e++) {
                    v = variables_1[_e];
                    regex = new RegExp('{{\\s*' + v + '\\s*}}', 'gm');
                    for (_f = 0, _g = tree; _f < _g.length; _f++) {
                        treeItem = _g[_f];
                        treeItem.pathString = treeItem.pathString.replace(regex, getVar(v));
                    }
                }
                // replace all variables in all files' content
                for (_h = 0, variables_2 = variables; _h < variables_2.length; _h++) {
                    v = variables_2[_h];
                    regex = new RegExp('c{{\\s*' + v + '\\s*}}', 'gm');
                    for (_j = 0, _k = tree; _j < _k.length; _j++) {
                        treeItem = _k[_j];
                        if (treeItem.isDir === false) {
                            treeItem.content = treeItem.content.replace(regex, getVar(v));
                        }
                    }
                }
                collides = filesystem_1.CheckForFileCollisions(tree, targetDir);
                if (!collides) return [3 /*break*/, 4];
                return [4 /*yield*/, console_1.PromptOnCollision()];
            case 3:
                confirmed = _l.sent();
                if (confirmed !== true) {
                    console.log(chalk_1.default.yellow('Cancelled.'));
                    process.exit(0);
                }
                _l.label = 4;
            case 4:
                // generate the file structure from the tree object
                filesystem_1.GenerateStructureFromTree(tree, targetDir);
                console.log(chalk_1.default.greenBright("Succesfully created " + chalk_1.default.bold(boilerplateName) + " in " + targetDir));
                return [2 /*return*/];
        }
    });
}); });
