import chalk from 'chalk';
import path from 'path';

import {
  GetBoilerplateContentPaths,
  GenerateStructureFromTree
} from '../utils/filesystem';

export default (input: any, flags: any) => {
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

  // replace all variables inside of file and folder names
  for (const flag in flags) {
    let regex = new RegExp('{{\\s*' + flag + '\\s*}}', 'gm');
    for (let treeItem of tree) {
      treeItem.pathString = treeItem.pathString.replace(regex, flags[flag]);
    }
  }

  // replace all variables in all files' content
  for (const flag in flags) {
    // 'c' in front of the regex in order to prevent collisions with other mustache like syntax that may occur in boilerplate files
    let regex = new RegExp('c{{\\s*' + flag + '\\s*}}', 'gm');
    for (let treeItem of tree) {
      if (treeItem.isDir === false) {
        treeItem.content = treeItem.content.replace(regex, flags[flag]);
      }
    }
  }
  GenerateStructureFromTree(tree, targetDir);

  console.log(
    chalk.greenBright(
      `Succesfully created ${chalk.bold(boilerplateName)} in ${targetDir}`
    )
  );
};
