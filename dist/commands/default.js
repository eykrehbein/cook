"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var filesystem_1 = require("../utils/filesystem");
exports.default = (function (input, flags) {
    var boilerplateName = input[0];
    // optional target dir
    var targetDir = input[1];
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
    // get folder
    // for each file
    // replace any variables in file name
    // replace any variables in file content
    // store files like they were stored in the boilerplate dir into the target dir
    var tree = filesystem_1.GetBoilerplateContentPaths(boilerplateName);
    // replace all variables inside of file and folder names
    for (var flag in flags) {
        var regex = new RegExp('{{\\s*' + flag + '\\s*}}', 'gm');
        for (var _i = 0, tree_1 = tree; _i < tree_1.length; _i++) {
            var treeItem = tree_1[_i];
            treeItem.pathString = treeItem.pathString.replace(regex, flags[flag]);
        }
    }
    // replace all variables in all files' content
    for (var flag in flags) {
        // 'c' in front of the regex in order to prevent collisions with other mustache like syntax that may occur in boilerplate files
        var regex = new RegExp('c{{\\s*' + flag + '\\s*}}', 'gm');
        for (var _a = 0, tree_2 = tree; _a < tree_2.length; _a++) {
            var treeItem = tree_2[_a];
            if (treeItem.isDir === false) {
                treeItem.content = treeItem.content.replace(regex, flags[flag]);
            }
        }
    }
    filesystem_1.GenerateStructureFromTree(tree, targetDir);
    console.log(chalk_1.default.greenBright("Succesfully created " + chalk_1.default.bold(boilerplateName) + " in " + targetDir));
});
