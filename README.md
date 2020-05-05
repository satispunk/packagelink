# packagelink
`npm link` alternative tool

### Use case
There are two main points why this I created this package:
- Link local packages in a consumer application in scenarios where `npm link` does not work well. 
- Be able to run local packages in CI environment skipping package publishing to npm repository.

#### Problem with npm link 
Though `npm link` is great tool, it does not work well in some scenarios. 
If local package has dependencies `react` or `react-redux` then those dependencies will be bundled and used twice,
as webpack finds modules by its real path. 

### How does it work
There are two modes `publish` and `install`.
You can `publish` packages from local repository to the OS temp directory. 
Each published package is packed to a corresponding *.tgz file.
Then you can `install` packages in a consumer application. Each installed *.tgz file is copied to a consumer application folder.

### Example

#### Installation

```
npm install --save-dev @satispunk/packagelink
```
or install it globally
```
npm install -g @satispunk/packagelink
```

#### Single package
 
- run `packagelink publish` from the local package root folder where package.json is present.   
- run `packagelink install my-package-name` from the consumer application root folder.

#### Mono repository

Installing multiple packages 1 by 1 from mono repository might be annoying. So there is configuration file that can help automate things.

- create `packagelink.config.js` in the local package root folder
- specify paths to packages you want to publish. for lerna monorepo it could be:
```js
const path = require('path');
const glob = require('glob');

module.exports = {
  publish: {
    packages: glob.sync(path.resolve(__dirname, 'packages/*')),
  },
}
```
- run `packagelink publish`. if packages are present in config it will try to publish them instead of using package.json file.
- create `packagelink.config.js` in the consumer application root folder
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

### CLI

#### packagelink publish

Publish local packages based packagelink.config.js or package.json 

#### packagelink install [packageName] [--dev] 

Install packages based packagelink.config.js or provided packageName argument.
If `--dev` is set, packages is installed as devDependency.

### Config

#### For publish
```js
const path = require('path');
const glob = require('glob');

module.exports = {
  publish: {
    packages: glob.sync(path.resolve(__dirname, 'packages/*')),
  },
}
``` 

#### For install
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