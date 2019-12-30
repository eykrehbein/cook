import chalk from 'chalk';
import path from 'path';

import {
  GetBoilerplateContentPaths,
  GenerateStructureFromTree,
  CheckForFileCollisions
} from '../utils/filesystem';

import { PromptForVariables, PromptOnCollision } from '../utils/console';

export default async (input: any, flags: any) => {
  const boilerplateName = input[0];

  // optional target dir
  let targetDir = input[1];
  if (typeof targetDir === 'undefined') {
    targetDir = process.cwd();
  } else {
    targetDir = path.join(process.cwd(), targetDir);
  }
  // check if name is valid
  if (typeof boilerplateName === 'undefined') {
    console.error(chalk.red('No name defined'));
    process.exit(1);
  }

  // get folder
  // for each file
  // replace any variables in file name
  // replace any variables in file content
  // store files like they were stored in the boilerplate dir into the target dir
  const tree = GetBoilerplateContentPaths(boilerplateName);
  if (tree === null) {
    console.log(chalk.red('Boilerplate not found'));
    process.exit(1);
  }

  // get all variable names and store them into the variables array

  let variables: string[] = [];

  const regexName = new RegExp('{{(.*?)}}', 'gm');
  const regexContent = /c{{(.*?)}}/gim;
  for (let treeItem of tree!) {
    // check file and folder names

    const regexExecOnName = regexName.exec(treeItem.pathString);
    if (regexExecOnName !== null) {
      const varName = regexExecOnName[1].trimLeft().trimRight();
      if (!variables.includes(varName)) {
        variables.push(varName);
      }
    }

    if (!treeItem.isDir) {
      const regexMatchOnContent = treeItem.content.match(regexContent);
      if (regexMatchOnContent !== null) {
        for (const item of regexMatchOnContent) {
          let splitItem: string = item;
          const varName = splitItem
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

  // Check which variables are already filled by flags.
  // If a variable's value wasn't set via flags, prompt the user to fill in a value
  let filledVariables: any = variables.map(varString => {
    return { name: varString, value: flags[varString] || '' };
  });

  let blankVariableNames: string[] = [];

  for (const v of filledVariables) {
    if (v.value === '') {
      blankVariableNames.push(v.name);
    }
  }

  // prompt the user for missing variables and fill them
  if (blankVariableNames.length > 0) {
    const promptResponse = await PromptForVariables(blankVariableNames);

    const _resKeys = Object.keys(promptResponse);
    for (let item of filledVariables) {
      if (_resKeys.includes(item.name)) {
        item.value = promptResponse[item.name];
      }
    }
  }

  const getVar = (name: string) => {
    for (let item of filledVariables) {
      if (item.name === name) {
        return item.value;
      }
    }
    return '';
  };

  // replace all variables inside of file and folder names
  for (const v of variables) {
    let regex = new RegExp('{{\\s*' + v + '\\s*}}', 'gm');
    for (let treeItem of tree!) {
      treeItem.pathString = treeItem.pathString.replace(regex, getVar(v));
    }
  }

  // replace all variables in all files' content
  for (const v of variables) {
    // 'c' in front of the regex in order to prevent collisions with other mustache like syntax that may occur in boilerplate files
    let regex = new RegExp('c{{\\s*' + v + '\\s*}}', 'gm');
    for (let treeItem of tree!) {
      if (treeItem.isDir === false) {
        treeItem.content = treeItem.content.replace(regex, getVar(v));
      }
    }
  }

  // check if any files would be overwritten
  const collides: boolean = CheckForFileCollisions(tree!, targetDir);

  if (collides) {
    const confirmed = await PromptOnCollision();
    if (confirmed !== true) {
      console.log(chalk.yellow('Cancelled.'));
      process.exit(0);
    }
  }

  // generate the file structure from the tree object
  GenerateStructureFromTree(tree, targetDir);

  console.log(
    chalk.greenBright(
      `Succesfully created ${chalk.bold(boilerplateName)} in ${targetDir}`
    )
  );
};
