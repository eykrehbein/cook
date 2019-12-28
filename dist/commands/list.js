"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_columns_1 = __importDefault(require("cli-columns"));
var chalk_1 = __importDefault(require("chalk"));
var filesystem_1 = require("../utils/filesystem");
exports.default = (function () {
    var existing = filesystem_1.GetBoilerplateList();
    if (existing.length === 0) {
        console.log(chalk_1.default.yellow("No boilerplates exist yet."));
        process.exit(0);
    }
    console.log(chalk_1.default.greenBright('Existing Boilerplates:'));
    console.log(cli_columns_1.default(existing));
    process.exit(0);
});
