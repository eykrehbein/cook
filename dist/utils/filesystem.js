"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var walk_sync_1 = __importDefault(require("walk-sync"));
exports.defaultFolderPath = path_1.default.join(os_1.default.homedir(), '.cook');
// check whether a boilerplate exists
function BoilerplateExists(name) {
    return fs_extra_1.default.existsSync(path_1.default.join(exports.defaultFolderPath, name));
}
exports.BoilerplateExists = BoilerplateExists;
// copy an existing directory into a new boilerplate directory
function CreateBoilerplateFromExistingDir(existingFolderPath, bpName) {
    fs_extra_1.default.copySync(existingFolderPath, path_1.default.join(exports.defaultFolderPath, bpName));
    return path_1.default.join(exports.defaultFolderPath, bpName);
}
exports.CreateBoilerplateFromExistingDir = CreateBoilerplateFromExistingDir;
// get a list of all boilerplates
function GetBoilerplateList() {
    return fs_extra_1.default.readdirSync(exports.defaultFolderPath);
}
exports.GetBoilerplateList = GetBoilerplateList;
// create empty boilerplate. Returns the folder's name
function CreateEmptyBoilerplate(name) {
    fs_extra_1.default.mkdirSync(path_1.default.join(exports.defaultFolderPath, name));
    return path_1.default.join(exports.defaultFolderPath, name);
}
exports.CreateEmptyBoilerplate = CreateEmptyBoilerplate;
// create the default folder that holds all boilerplates
function CreateBoilerplateRootFolder() {
    fs_extra_1.default.ensureDirSync(exports.defaultFolderPath);
}
exports.CreateBoilerplateRootFolder = CreateBoilerplateRootFolder;
// get all files and folders in boilerplate
function GetBoilerplateContentPaths(name) {
    var treeArray = walk_sync_1.default(path_1.default.join(exports.defaultFolderPath, name));
    var tree = treeArray.map(function (p) {
        var isDir = fs_extra_1.default
            .lstatSync(path_1.default.join(exports.defaultFolderPath, name, p))
            .isDirectory();
        var fullPath = path_1.default.join(exports.defaultFolderPath, name, p);
        var content;
        if (!isDir) {
            content = fs_extra_1.default.readFileSync(fullPath).toString();
        }
        return {
            isDir: isDir,
            pathString: p,
            fullPath: fullPath,
            content: content
        };
    });
    tree.sort(function (a, b) {
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
exports.GetBoilerplateContentPaths = GetBoilerplateContentPaths;
// generate the boilerplate structure from the tree object into the target dir
function GenerateStructureFromTree(tree, targetDir) {
    for (var _i = 0, tree_1 = tree; _i < tree_1.length; _i++) {
        var item = tree_1[_i];
        if (!item.isDir) {
            fs_extra_1.default.ensureFileSync(path_1.default.join(targetDir, item.pathString));
            fs_extra_1.default.writeFileSync(path_1.default.join(targetDir, item.pathString), item.content);
        }
    }
}
exports.GenerateStructureFromTree = GenerateStructureFromTree;
function RemoveBoilerplate(name) {
    fs_extra_1.default.removeSync(path_1.default.join(exports.defaultFolderPath, name));
}
exports.RemoveBoilerplate = RemoveBoilerplate;
function DirectoryExists(p) {
    return fs_extra_1.default.pathExistsSync(path_1.default.join(process.cwd(), p));
}
exports.DirectoryExists = DirectoryExists;
