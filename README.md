# @satispunk/packagelink

`npm link` alternative tool

## Use case

There are two things this package is good for:
- Link local packages into a consumer project in cases where `npm link` does not work well. 
- Link many local packages at once.
- Run local packages in a CI environment skipping package publishing to an NPM registry.

## Problem with npm link 

Though `npm link` is a great tool, it does not work well in some scenarios. 
If a local package has dependencies, e.g. `react` or `react-redux`, then those dependencies will be bundled and used twice,
as webpack finds modules by their real path. 

## How does it work

There are two modes `publish` and `install`.
You can `publish` packages from a local repository to the OS temporary directory. 
Each published package is packed into a corresponding *.tgz file.
Then you can `install` packages in a consumer application. Each installed *.tgz file is copied to the consumer application folder.

## Example

### Installation

```
npm install --save-dev @satispunk/packagelink
```
or install it globally
```
npm install -g @satispunk/packagelink
```

### Link single package
 
- run `packagelink publish` from the local package root folder where package.json is present.   
- run `packagelink install my-package-name` from the consumer application root folder.

### Link many packages from a monorepo

Installing multiple packages 1 by 1 from a monorepo might be annoying. So there is a configuration file that helps to automate things.

- create `packagelink.config.js` in the local package root folder
- specify paths to packages you want to publish. It could look like this:

```js
const path = require('path');
const glob = require('glob');

module.exports = {
  publish: {
    packages: glob.sync(path.resolve(__dirname, 'packages/*')),
  },
}
```
- run `packagelink publish`
- create `packagelink.config.js` in the consumer project root folder
- specify dependencies you would like to install

```js
module.exports = {
  install : {
    dependencies: [
      'my-package1',
    ],
    devDependencies: [
      'my-package2',
    ]
  },
}
```
- run `packagelink install`
- Your packages are ready and will work the same way as if you installed them from NPM. 

## CLI

### packagelink publish

Publish local packages based packagelink.config.js or package.json 

### packagelink install [packageName] [--dev] 

Install packages based packagelink.config.js or provided packageName argument.
If `--dev` is set, packages are installed as devDependency.

## Config

### Publishing config (source project)

```js
const path = require('path');
const glob = require('glob');

module.exports = {
  publish: {
    packages: glob.sync(path.resolve(__dirname, 'packages/*')),
  },
}
``` 

### Installation config (consumer project)

```js
module.exports = {
  install : {
    dependencies: [
      'my-package1',
    ],
    devDependencies: [
      'my-package2',
    ]
  },
}
```