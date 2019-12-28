"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var filesystem_1 = require("../utils/filesystem");
exports.default = (function (input, flags) {
    // name of the new boilerplate
    var name = input[1];
    // whether an existing folder should be copied as the new boilerplate
    var shouldCopyExistingFolder = !!flags.copy;
    // check if name is valid
    if (typeof name === 'undefined') {
        console.error(chalk_1.default.red('No name defined'));
        process.exit(1);
    }
    // check if the given boilerplate name already exists
    if (filesystem_1.BoilerplateExists(name)) {
        console.error(chalk_1.default.red('Boilerplate already exists'));
        process.exit(1);
    }
    // create an empty boilerplate folder, if no existing dir should be copied
    if (!shouldCopyExistingFolder) {
        var dirpath_1 = filesystem_1.CreateEmptyBoilerplate(name);
        console.log(chalk_1.default.greenBright("Created a new empty Boilerplate at " + dirpath_1));
        process.exit(0);
    }
    // check if a copy directory is provided. if not, run the following code and copy the cwd
    if (typeof flags.copy === 'boolean' ||
        (typeof flags.copy === 'string' && flags.copy.length === 0)) {
        var cwd = process.cwd();
        var dirpath_2 = filesystem_1.CreateBoilerplateFromExistingDir(cwd, name);
        console.log(chalk_1.default.greenBright("Copied the current directory to create a new Boilerplate at " + dirpath_2));
        process.exit(0);
    }
    // if a copy-dir string is provided
    var dirpath = filesystem_1.CreateBoilerplateFromExistingDir(flags.copy, name);
    console.log(chalk_1.default.greenBright("Copied '" + flags.copy + "' to create a new Boilerplate at " + dirpath));
    process.exit(0);
});
