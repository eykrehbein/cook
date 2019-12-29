import axios from 'axios';
import { defaultFolderPath } from './filesystem';
import path from 'path';
import fs from 'fs-extra';

export type GithubTreeObject = {
  name: string;
  path: string;
  download_url: string;
  type: string;
};

export async function GetGithubTemplateStructure(
  name: string
): Promise<null | GithubTreeObject[]> {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${name}/contents/template`
    );
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function GetGithubDirTree(
  name: string,
  relPath: string
): Promise<Array<GithubTreeObject>> {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${name}/contents/template/${relPath}`
    );

    if (res.status === 200) {
      return res.data;
    }
    return [];
  } catch (e) {
    return [];
  }
}

// function to recursively copy a template from github
export async function CopyGithubTemplate(
  tree: GithubTreeObject[],
  targetBoilerplateName: string,
  name: string
) {
  await ScanFolderFromGithubTree(tree, targetBoilerplateName, name);
  return path.join(defaultFolderPath, targetBoilerplateName);
}

export async function GetGithubFileContent(
  downloadURL: string
): Promise<string> {
  try {
    const res = await axios.get(downloadURL, {
      /* disable json parsing */ transformResponse: res => res
    });
    if (res.status !== 200) {
      return '';
    }

    return res.data;
  } catch (e) {
    return '';
  }
}

// scan github tree object. create all files in the current tree object. recursively call the function again if any folders were found inside this folder.
export async function ScanFolderFromGithubTree(
  tree: GithubTreeObject[],
  targetBoilerplateName: string,
  name: string
) {
  for (let item of tree) {
    const relPath = item.path.split('template/')[1];
    const absPath = path.join(
      defaultFolderPath,
      targetBoilerplateName,
      relPath
    );

    if (item.type === 'file') {
      fs.ensureFileSync(absPath);
      const content = await GetGithubFileContent(item.download_url);
      fs.writeFileSync(absPath, content);
    }

    if (item.type === 'dir') {
      if (!fs.existsSync(absPath)) {
        fs.ensureDirSync(absPath);
      }
      const relTree = await GetGithubDirTree(name, relPath);
      await ScanFolderFromGithubTree(relTree, targetBoilerplateName, name);
    }
  }
}
