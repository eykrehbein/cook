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
    var boilerplateName, targetDir, tree, variables, regexName, regexContent, _i, tree_1, treeItem, regexExecOnName, varName, regexMatchOnContent, _a, regexMatchOnContent_1, item, splitItem, varName, filledVariables, blankVariableNames, _b, filledVariables_1, v, promptResponse, _resKeys, _c, filledVariables_2, item, getVar, _d, variables_1, v, regex, _e, tree_2, treeItem, _f, variables_2, v, regex, _g, tree_3, treeItem;
    return __generator(this, function (_h) {
        switch (_h.label) {
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
                for (_i = 0, tree_1 = tree; _i < tree_1.length; _i++) {
                    treeItem = tree_1[_i];
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
                            for (_a = 0, regexMatchOnContent_1 = regexMatchOnContent; _a < regexMatchOnContent_1.length; _a++) {
                                item = regexMatchOnContent_1[_a];
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
                for (_b = 0, filledVariables_1 = filledVariables; _b < filledVariables_1.length; _b++) {
                    v = filledVariables_1[_b];
                    if (v.value === '') {
                        blankVariableNames.push(v.name);
                    }
                }
                if (!(blankVariableNames.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, console_1.PromptForVariables(blankVariableNames)];
            case 1:
                promptResponse = _h.sent();
                _resKeys = Object.keys(promptResponse);
                for (_c = 0, filledVariables_2 = filledVariables; _c < filledVariables_2.length; _c++) {
                    item = filledVariables_2[_c];
                    if (_resKeys.includes(item.name)) {
                        item.value = promptResponse[item.name];
                    }
                }
                _h.label = 2;
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
                for (_d = 0, variables_1 = variables; _d < variables_1.length; _d++) {
                    v = variables_1[_d];
                    regex = new RegExp('{{\\s*' + v + '\\s*}}', 'gm');
                    for (_e = 0, tree_2 = tree; _e < tree_2.length; _e++) {
                        treeItem = tree_2[_e];
                        treeItem.pathString = treeItem.pathString.replace(regex, getVar(v));
                    }
                }
                // replace all variables in all files' content
                for (_f = 0, variables_2 = variables; _f < variables_2.length; _f++) {
                    v = variables_2[_f];
                    regex = new RegExp('c{{\\s*' + v + '\\s*}}', 'gm');
                    for (_g = 0, tree_3 = tree; _g < tree_3.length; _g++) {
                        treeItem = tree_3[_g];
                        if (treeItem.isDir === false) {
                            treeItem.content = treeItem.content.replace(regex, getVar(v));
                        }
                    }
                }
                filesystem_1.GenerateStructureFromTree(tree, targetDir);
                console.log(chalk_1.default.greenBright("Succesfully created " + chalk_1.default.bold(boilerplateName) + " in " + targetDir));
                return [2 /*return*/];
        }
    });
}); });
