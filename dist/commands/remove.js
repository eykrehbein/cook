"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var filesystem_1 = require("../utils/filesystem");
exports.default = (function (input) {
    var name = input[1];
    // check if name is valid
    if (typeof name === 'undefined') {
        console.error(chalk_1.default.red('No name defined'));
        process.exit(1);
    }
    filesystem_1.RemoveBoilerplate(input[1]);
    console.log(chalk_1.default.yellow("Successfully removed " + chalk_1.default.bold(name)));
});
