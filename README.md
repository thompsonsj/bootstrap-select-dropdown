# Bootstrap Select Dropdown

A jQuery plugin for Bootstrap 4 that converts <select> and <select multiselect> elements to dropdowns. Uses fuse.js for fuzzy search and Bootstrap's dropdown plugin.

## Demo and documentation

[https://thompsonsj.com/bootstrap-select-dropdown/](https://thompsonsj.com/bootstrap-select-dropdown/)

## Usage

### NPM

Install as a development dependency.

```
npm install --save-dev bootstrap-select-dropdown
```

Using a module bundler such as [webpack](https://webpack.js.org/), you may wish to bundle Bootstrap Select Dropdown together with Bootstrap. Bootstrap Select Dropdown requires `fuse.js` as well as the Bootstrap requirements of `popper.js` and `jquery`.

```
require('./scss/style.scss');
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import Fuse from 'fuse.js';
import 'bootstrap-select-dropdown';
```

Some CSS refinements are included. The SCSS file in the `dist` folder is designed to be included in a Bootstrap 4 bundle process. CSS files are also included and use the default Bootstrap 4 theme.

### <script>

Get started quickly by using CDNs/hosted files. Check [Introduction | Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/) for the latest versions.

```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="css/bootstrap-select-dropdown.css">

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="js/bootstrap-select-dropdown.js"></script>
```
