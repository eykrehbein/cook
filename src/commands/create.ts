import chalk from 'chalk';
import {
  BoilerplateExists,
  CreateEmptyBoilerplate,
  CreateBoilerplateFromExistingDir,
  DirectoryExists
} from '../utils/filesystem';

import {
  GetGithubTemplateStructure,
  CopyGithubTemplate
} from '../utils/github';

export default async (input: any, flags: any) => {
  // name of the new boilerplate
  const name = input[1];

  // whether an existing folder should be copied as the new boilerplate
  const shouldCopyExistingFolder = !!flags.copy;

  // check if name is valid
  if (typeof name === 'undefined') {
    console.error(chalk.red('No name defined'));
    process.exit(1);
  }

  // check if the given boilerplate name already exists
  if (BoilerplateExists(name)) {
    console.error(chalk.red('Boilerplate already exists'));
    process.exit(1);
  }

  // create an empty boilerplate folder, if no existing dir should be copied
  if (!shouldCopyExistingFolder) {
    const dirpath = CreateEmptyBoilerplate(name);
    console.log(
      chalk.greenBright(`Created a new empty Boilerplate at ${dirpath}`)
    );

    process.exit(0);
  }

  // check if a copy directory is provided. if not, run the following code and copy the cwd
  if (
    typeof flags.copy === 'boolean' ||
    (typeof flags.copy === 'string' && flags.copy.length === 0)
  ) {
    const cwd = process.cwd();
    const dirpath = CreateBoilerplateFromExistingDir(cwd, name);

    console.log(
      chalk.greenBright(
        `Copied the current directory to create a new Boilerplate at ${dirpath}`
      )
    );
    process.exit(0);
  }

  // if a copy-dir string is provided

  // if the local directory exists, use it to create a new boilerplate
  let dirpath;
  if (DirectoryExists(flags.copy)) {
    dirpath = CreateBoilerplateFromExistingDir(flags.copy, name);
  } else {
    const githubTemplateStructure = await GetGithubTemplateStructure(
      flags.copy
    );

    if (githubTemplateStructure === null) {
      console.log(
        chalk.red(
          `No local or remote template found for the path '${flags.copy}'`
        )
      );
      process.exit(1);
    }

    await CopyGithubTemplate(githubTemplateStructure!, name, flags.copy);

    process.exit(0);
  }

  console.log(
    chalk.greenBright(
      `Copied '${flags.copy}' to create a new Boilerplate at ${dirpath}`
    )
  );
  process.exit(0);
};
