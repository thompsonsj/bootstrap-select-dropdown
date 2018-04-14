# Bootstrap Select Dropdown

A jQuery plugin for Bootstrap 4 that converts `<select>` and `<select multiselect>` elements to dropdowns. Uses fuse.js for fuzzy search and Bootstrap's dropdown plugin.

## Demo and documentation

[https://thompsonsj.com/bootstrap-select-dropdown/](https://thompsonsj.com/bootstrap-select-dropdown/)

## Getting started

### Compiled files
The dist folder contains the files you need to use Bootstrap Select Dropdown.

```
dist
 - bootstrap-select-dropdown.js
 - bootstrap-select-dropdown.min.js
```

If using search (enabled by default), you will also need [Fuse.js](http://fusejs.io/).

### Source

`src/js/bootstrap-select-dropdown.js` can be used if compiling Bootstrap Select Dropdown with Bootstrap.

As with Bootstrap JavaScript plugins, Bootstrap Select Dropdown depends on Bootstrap's `util.js`.

### NPM

Install as a development dependency.

```
npm install --save-dev bootstrap-select-dropdown
```

Using a module bundler such as [webpack](https://webpack.js.org/), you may wish to bundle Bootstrap Select Dropdown together with Bootstrap.

```
# Example Bootstrap imports.
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';

# Bootstrap Select Dropdown imports.
import Fuse from 'fuse.js';
import 'bootstrap-select-dropdown';
```

## Versioning

Version bump, builds, file tracking, commit and tag are handled automatically using the following commands.

```bash
npm version patch -m "Commit message."
npm version minor -m "Commit message."
npm version major -m "Commit message."
```

These commands call the `version` in `package.json`. This script builds documentation and distribution (including minified) files, and ensures changes applied by both builds are tracked by running `git add .`.

For more information on `npm version`, consult the [npm docs](https://docs.npmjs.com/cli/version).
