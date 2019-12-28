import chalk from 'chalk';
import { RemoveBoilerplate } from '../utils/filesystem';

export default (input: any) => {
  const name = input[1];
  // check if name is valid
  if (typeof name === 'undefined') {
    console.error(chalk.red('No name defined'));
    process.exit(1);
  }

  RemoveBoilerplate(input[1]);
  console.log(chalk.yellow(`Successfully removed ${chalk.bold(name)}`));
};
