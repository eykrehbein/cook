import prompt, { PromptObject } from 'prompts';

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
