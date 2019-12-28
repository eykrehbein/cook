#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var meow_1 = __importDefault(require("meow"));
// import utils
var create_1 = __importDefault(require("./commands/create"));
var list_1 = __importDefault(require("./commands/list"));
var default_1 = __importDefault(require("./commands/default"));
var remove_1 = __importDefault(require("./commands/remove"));
var filesystem_1 = require("./utils/filesystem");
var cli = meow_1.default("\n  Cook - Create and use Boilerplates\n\n  Commands:\n  - cook create <name> [--copy [dir]] |\u00A0Create a new boilerplate.\n  - cook remove <name> | Remove a boilerplate\n  - cook list | List existing boilerplates\n  - cook <name> [targetDir] [--flagVariables] | Use a boilerplate\n");
// create the Boilerplate default directory, if it doesn't exist yet
filesystem_1.CreateBoilerplateRootFolder();
switch (cli.input[0]) {
    case 'create':
        create_1.default(cli.input, cli.flags);
        break;
    case 'list':
        list_1.default();
        break;
    case 'remove':
        remove_1.default(cli.input);
        break;
    default:
        default_1.default(cli.input, cli.flags);
}
