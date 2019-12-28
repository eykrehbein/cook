import columns from 'cli-columns';
import chalk from 'chalk';
import { GetBoilerplateList } from '../utils/filesystem';

export default () => {
  const existing = GetBoilerplateList();
  if (existing.length === 0) {
    console.log(chalk.yellow(`No boilerplates exist yet.`));
    process.exit(0);
  }
  console.log(chalk.greenBright('Existing Boilerplates:'));
  console.log(columns(existing));
  process.exit(0);
};
