#!/usr/bin/env node
import meow from 'meow';

// import utils
import CreateBoilerplate from './commands/create';
import GetBoilerplateList from './commands/list';
import ApplyBoilerplate from './commands/default';
import RemoveBoilerplate from './commands/remove';

import { CreateBoilerplateRootFolder } from './utils/filesystem';

const cli = meow(`
  Cook - Create and use Boilerplates

  Commands:
  - cook create <name> [--copy [dir]] | Create a new boilerplate.
  - cook remove <name> | Remove a boilerplate
  - cook list | List existing boilerplates
  - cook <name> [targetDir] [--flagVariables] | Use a boilerplate
`);

// create the Boilerplate default directory, if it doesn't exist yet
CreateBoilerplateRootFolder();

switch (cli.input[0]) {
  case 'create':
    CreateBoilerplate(cli.input, cli.flags);
    break;
  case 'list':
    GetBoilerplateList();
    break;
  case 'remove':
    RemoveBoilerplate(cli.input);
    break;

  default:
    ApplyBoilerplate(cli.input, cli.flags);
}
