<h1 align="center">
  <br>
    <span style="font-size:90px">👨‍🍳</span>
  <br>
  Cook
  <br>
</h1>

<h4 align="center">A minimal CLI Tool to create and use your own boilerplates</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/@eyk/cook">
    <img src="https://badge.fury.io/js/%40eyk%2Fcook.svg"
         alt="NPM Version">
  </a>
    <a href="/LICENSE">
    <img src="https://badges.frapsoft.com/os/mit/mit.svg?v=102"
         alt="License">
  </a>
  <a href="https://github.com/eykrehbein/cook/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat"
         alt="PRs Welcome">
  </a>

  <a href="https://github.com/eykrehbein/cook/issues">
    <img src="https://img.shields.io/github/issues/eykrehbein/cook"
         alt="Open Issues">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
    <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#license">License</a>
</p>

<p align="center">
 <img src="assets/demo.gif" />
</p>

## Key Features

- Create boilerplates containing _files and folders_ with one command
- Use unlimited variables / placeholders which will be filled on creation
- Runs on Windows, MacOS and Linux

## Installation

With yarn:

```sh
yarn global add @eyk/cook
```

With npm:

```sh
npm install -g @eyk/cook
```

## Usage

#### Creating a Boilerplate

All boilerplates are stored in a newly created directory at `HOMEDIR/.cook`. You can create a new boilerplate by either creating a folder in this directory or using the following command.

```sh
cook create <name>
```

This command will create a new (empty) directory with the given name. You can modify the content by navigating into it.

Furthermore, you got the option to copy an existing directory into the newly created boilerplate folder automatically. This can be done by using the `--copy` flag.

Example:

```sh
# Copying the current working directory
cook create test --copy

# Copying a specific folder
cook create test --copy preparedFolder/
```

#### Variables

Cook's boilerplates aren't static. You can use variables inside of folder names, file names and the files' content.

Syntax:

- `{{ variableName }}` for using variables in file & folder names
- `c{{ variableName }}` for using variables inside of files

The `c` letter in front of the curly-braces has so special meaning, but it ensures there won't be any conflicts with other curly-braces like in Vue.js files.

_Example of creating a boilerplate for a React.js component:_

```
# Current working directory
my-boilerplate
└─── {{name}}
    │   {{name}}.js
    │   {{name}}.css
```

```jsx
// {{name}}.js file
import React from 'react';
import 'c{{name}}.css';

export default props => {
  return <div className="c{{name}}"></div>;
};
```

Command:

```sh
cook create rc --copy my-boilerplate
```

#### Applying Boilerplates

To apply a boilerplate, use the following command.

```sh
cook <name> [targetDir]
```

This will copy the named boilerplate into the target dir (or, if not specified, into the current working directory)

If you have used any variables, you can specify their value by using flags.

_Example:_

_Specified variables: `name`, `counter`_

Command:

```sh
cook <name> [targetDir] --name HelloWorld --counter 0
```

This will replace all occurrences of `name` and `counter` inside of pathnames and content.

#### Listing existing Boilerplates

If you want to get a list of all existing boilerplates, you can use the following command.

```sh
cook list
```

#### Removing Boilerplates

To remove a boilerplate, use the following command.

```sh
cook remove <name>
```

## License

MIT
