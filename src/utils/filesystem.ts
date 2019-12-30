import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import walk from 'walk-sync';

export type TreeItem = {
  isDir: boolean;
  pathString: string;
  fullPath: string;
  content: string;
};

export const defaultFolderPath = path.join(os.homedir(), '.cook');

// check whether a boilerplate exists
export function BoilerplateExists(name: string) {
  return fs.existsSync(path.join(defaultFolderPath, name));
}

// copy an existing directory into a new boilerplate directory
export function CreateBoilerplateFromExistingDir(
  existingFolderPath: string,
  bpName: string
): string {
  fs.copySync(existingFolderPath, path.join(defaultFolderPath, bpName));
  return path.join(defaultFolderPath, bpName);
}
// get a list of all boilerplates
export function GetBoilerplateList() {
  let dirsOnly: string[] = [];
  const allPaths = fs.readdirSync(defaultFolderPath);

  for (const p of allPaths) {
    if (fs.lstatSync(path.join(defaultFolderPath, p)).isDirectory()) {
      dirsOnly.push(p);
    }
  }
  return dirsOnly;
}

// create empty boilerplate. Returns the folder's name
export function CreateEmptyBoilerplate(name: string): string {
  fs.mkdirSync(path.join(defaultFolderPath, name));
  return path.join(defaultFolderPath, name);
}

// create the default folder that holds all boilerplates
export function CreateBoilerplateRootFolder() {
  fs.ensureDirSync(defaultFolderPath);
}

// get all files and folders in boilerplate
export function GetBoilerplateContentPaths(name: string): TreeItem[] | null {
  if (!fs.existsSync(path.join(defaultFolderPath, name))) {
    return null;
  }
  const treeArray = walk(path.join(defaultFolderPath, name));
  const tree: TreeItem[] = treeArray.map(p => {
    const isDir = fs
      .lstatSync(path.join(defaultFolderPath, name, p))
      .isDirectory();
    const fullPath = path.join(defaultFolderPath, name, p);
    let content: string = '';
    if (!isDir) {
      content = fs.readFileSync(fullPath).toString();
    }

    return {
      isDir,
      pathString: p,
      fullPath,
      content
    };
  });
  tree.sort((a, b) => {
    if (a.isDir && !b.isDir) {
      return -1;
    }
    if (!a.isDir && b.isDir) {
      return 1;
    }
    return 0;
  });

  return tree;
}

// generate the boilerplate structure from the tree object into the target dir
export function GenerateStructureFromTree(tree: any, targetDir: string) {
  for (let item of tree) {
    if (!item.isDir) {
      fs.ensureFileSync(path.join(targetDir, item.pathString));
      fs.writeFileSync(path.join(targetDir, item.pathString), item.content);
    }
  }
}

export function RemoveBoilerplate(name: string) {
  fs.removeSync(path.join(defaultFolderPath, name));
}

export function DirectoryExists(p: string) {
  return fs.pathExistsSync(path.join(process.cwd(), p));
}

// returns boolean whether any files or folders within the recipy would overwrite existing files
export function CheckForFileCollisions(
  tree: TreeItem[],
  targetDir: string
): boolean {
  for (const treeItem of tree) {
    const targetPath = path.join(targetDir, treeItem.pathString);
    if (fs.existsSync(targetPath)) {
      return true;
    }
  }
  return false;
}
