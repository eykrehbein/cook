import prompt from 'prompts';

export async function PromptForVariables(
  names: string[]
): Promise<prompt.Answers<string>> {
  const questions: any = names.map(name => {
    return {
      type: 'text',
      name,
      message: name
    };
  });
  const response = await prompt(questions);

  return response;
}

export async function PromptOnCollision(): Promise<boolean> {
  const response = await prompt({
    type: 'confirm',
    name: 'value',
    message:
      'Cook will overwrite existing files in the target directory. Continue?',
    initial: false
  });

  return <boolean>response.value;
}
