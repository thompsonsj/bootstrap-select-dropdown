/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);
__webpack_require__(3);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _util = __webpack_require__(4);

var _util2 = _interopRequireDefault(_util);

var _fuse = __webpack_require__(5);

var _fuse2 = _interopRequireDefault(_fuse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SelectDropdownIndex = 1;

/**
 * --------------------------------------------------------------------------
 * Bootstrap Select Dropdown
 * --------------------------------------------------------------------------
 */

var SelectDropdown = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'selectDropdown';
  var VERSION = '0.7.0';
  var DATA_KEY = 'bs.selectDropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ENTER_KEYCODE = 13;
  var ESCAPE_KEYCODE = 27;
  var ARROW_UP_KEYCODE = 38;
  var ARROW_DOWN_KEYCODE = 40;

  var Default = {
    // Behaviour
    maxListLength: 4,
    hideSelect: true,
    search: true,
    observeDomMutations: false,
    maxHeight: '300px',
    keyboard: true,
    // Text
    textNoneSelected: "None selected",
    textMultipleSelected: "Multiple selected",
    textNoResults: "No results",
    // HTML
    htmlClear: "Clear search",
    // Classes
    classBtnClear: "btn btn-outline-secondary",
    classBtnSearch: "btn btn-primary"
  };

  var DefaultType = {
    maxListLength: 'number',
    hideSelect: 'boolean',
    search: 'boolean',
    observeDomMutations: 'boolean',
    maxHeight: 'string',
    keyboard: 'boolean',
    textNoneSelected: 'string',
    textMultipleSelected: 'string',
    textNoResults: 'string',
    htmlClear: 'string',
    classBtnClear: 'string',
    classBtnSearch: 'string'
  };

  var Event = {
    KEYUP: 'keyup' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN: 'dropdown',
    MENU: 'dropdown-menu',
    ITEM: 'dropdown-item',
    HOVER: 'hover',
    ALIGNMENT_RIGHT: '.dropdown-menu-right'
  };

  var Selector = {
    DATA_TOGGLE: '[data-toggle="select-dropdown"]'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var SelectDropdown = function () {
    function SelectDropdown(element, config) {
      var _this = this;

      _classCallCheck(this, SelectDropdown);

      this._config = this._getConfig(config);
      this._element = element;
      this._prefix = 'bsd' + this._config.SelectDropdownIndex + '-';

      this._multiselect = this._isMultiselect(element);
      this._indexes = [];
      this._lastSearch = null;
      this._resultsChanged = false;
      this._hoverItem = $();

      this.ids = {};
      this.ids.dropdownContainerId = this._prefix + 'container';
      this.ids.dropdownButtonId = this._prefix + 'button';
      this.ids.controlSearchId = this._prefix + 'search';
      this.ids.dropdownItemDeselect = this._prefix + 'deselect';
      this.ids.dropdownItemShowSelected = this._prefix + 'selected';

      // Properties: Elements.
      this.els = {};
      this.els.button = this.buildButton();
      this.els.buttonClear = this.buildButtonClear();
      this.els.controlSearch = this.buildcontrolSearch();
      this.els.controlDeselect = this.buildDeselectAll();
      this.els.controlSelected = this.buildShowSelected();
      this.els.dropdown = this.buildDropdownMenu();
      this.els.dropdownItemsContainer = this.buildDropdownItemsContainer();
      this.els.dropdownItemNoResults = this.buildDropdownItemNoResults();
      this.els.dropdownItems = this.buildDropdownItems();
      this.els.dropdownOptions = this.els.dropdownItems.filter(function (index, element) {
        return _this.isOption($(element));
      });

      if (this._config.search) {
        this._haystack = [];
        this._fuseOptions = {
          keys: ['text'],
          id: 'index'
        };
        this.els.dropdownOptions.each(function (index, element) {
          _this._haystack[index] = {
            index: $(element).data('index'),
            text: $(element).text()
          };
        });
      }

      this._addEventListeners();

      this.init();
    }

    // Getters

    _createClass(SelectDropdown, [{
      key: 'hoverSet',


      // Public

      /**
       * Set hover class position.
       *
       * Move the hover class to a designated dropdown option. If the index points
       * to a non-option, the next option will be modified.
       * @param {integer} index Dropdown menu item index.
       */
      value: function hoverSet(index) {
        var _ = this;
        _.els.dropdownOptions.removeClass(ClassName.HOVER);
        if ((typeof index === 'undefined' ? 'undefined' : _typeof(index)) === ( true ? 'undefined' : _typeof(undefined))) {
          var $item = _.els.dropdownOptions.first();
        } else {
          var $item = _.dropdownItemByIndex(index);
        }
        _._hoverItem = $item;
        $item.addClass(ClassName.HOVER);
      }

      /**
       * Move the hover class up.
       *
       * @return void
       */

    }, {
      key: 'hoverUp',
      value: function hoverUp() {
        var _ = this;
        var current = _._hoverItem;
        if ((typeof current === 'undefined' ? 'undefined' : _typeof(current)) !== ( true ? 'undefined' : _typeof(undefined)) && current.length) {
          var prev = current.prevAll('a:visible').first();
        }
        if ((typeof prev === 'undefined' ? 'undefined' : _typeof(prev)) !== ( true ? 'undefined' : _typeof(undefined)) && prev.length) {
          current.removeClass(ClassName.HOVER);
          prev.addClass(ClassName.HOVER);
          _._hoverItem = prev;
        }
      }

      /**
       * Move the hover class down.
       *
       * @return void
       */

    }, {
      key: 'hoverDown',
      value: function hoverDown() {
        var _ = this;
        var current = _._hoverItem;
        if ((typeof current === 'undefined' ? 'undefined' : _typeof(current)) !== ( true ? 'undefined' : _typeof(undefined)) && current.length) {
          var next = current.nextAll('a:visible').first();
        }
        if ((typeof next === 'undefined' ? 'undefined' : _typeof(next)) !== ( true ? 'undefined' : _typeof(undefined)) && next.length) {
          current.removeClass(ClassName.HOVER);
          next.addClass(ClassName.HOVER);
          _._hoverItem = next;
        }
      }

      /**
       * Remove hover class from all dropdown options.
       * @return void
       */

    }, {
      key: 'hoverRemove',
      value: function hoverRemove() {
        var _ = this;
        _.els.dropdownItems.removeClass(ClassName.HOVER).show();
      }

      /**
       * Select/Deselect a dropdown item, and update the corresponding option.
       * @param  {object} $dropdownItem jQuery object
       * @return void
       */

    }, {
      key: 'toggle',
      value: function toggle($dropdownItem) {
        var _ = this;
        var $el = $(_._element);
        var itemIndex = $dropdownItem.data('option');
        var $option = $el.find('option').eq(itemIndex);
        if ($option.is(':selected')) {
          $option.prop('selected', false);
          $dropdownItem.removeClass('active');
        } else {
          if (!_._multiselect) {
            _.els.dropdownOptions.removeClass('active');
          }
          $option.prop('selected', true);
          $dropdownItem.addClass('active');
        }
        _.setButtonText();
        _.refreshInitialControls();
      }

      /**
       * Deselect all dropdown items.
       * @return void
       */

    }, {
      key: 'deselectAll',
      value: function deselectAll() {
        var _ = this;
        var $el = $(_._element);
        _.els.dropdownOptions.each(function () {
          _.deselect($(this));
        });
        _.refresh();
      }

      /**
       * Deselect a dropdown item.
       * @param  {object} $dropdownItem jQuery object
       * @return void
       */

    }, {
      key: 'deselect',
      value: function deselect($dropdownItem) {
        var _ = this;
        var $el = $(_._element);
        var itemIndex = $dropdownItem.data('option');
        var $option = $el.find('option').eq(itemIndex);
        if ($option.is(':selected')) {
          _.toggle($dropdownItem);
        }
      }

      // Private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = Object.assign({}, Default, config);
        _util2.default.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        var _this2 = this;

        if (this._config.search) {
          this.els.controlSearch.on(Event.KEYUP, function (event) {
            return _this2._keyup(event);
          });
        }
      }
    }, {
      key: '_keyup',
      value: function _keyup(event) {
        if (this._config.keyboard) {
          if (event.which == ENTER_KEYCODE) {
            this.toggle(this.els.dropdown.find('.hover').first());
            if (!this._multiselect) {
              this.els.button.dropdown('toggle');
            }
            return;
          } else if (event.which == ARROW_UP_KEYCODE) {
            if (!this.dropdownActive()) {
              this.els.button.dropdown('toggle');
              this.els.controlSearch.focus();
            }
            this.hoverUp();
            return;
          } else if (event.which == ARROW_DOWN_KEYCODE) {
            if (!this.dropdownActive()) {
              this.els.button.dropdown('toggle');
              this.els.controlSearch.focus();
            }
            this.hoverDown();
            return;
          }
        }
        this._search($(this.els.controlSearch).val());
      }
    }, {
      key: 'init',
      value: function init() {
        var _ = this; // Deep reference to this.
        var $el = $(_._element);

        // Handle cut and paste.
        _.els.controlSearch.bind({
          paste: function paste() {
            $(this).trigger('keydown');
          },
          cut: function cut() {
            $(this).trigger('keydown');
          }
        });

        // Build.
        _.setButtonText();
        var $dropdown = _.buildDropdown();
        $dropdown.append(_.els.dropdown);
        _.els.dropdownItemsContainer.append(_.els.dropdownItems);
        if (_._multiselect) {
          _.els.dropdown.append(_.els.controlDeselect).append(_.els.controlSelected);
        }
        _.els.dropdown.append(_.els.dropdownItemsContainer);
        $el.after($dropdown);
        if (_._config.hideSelect) {
          $el.hide();
        }

        // Set/Remove hover
        _.els.controlSearch.on('focus', function () {
          _.hoverSet();
        });
        _.els.controlSearch.on('blur', function () {
          _.hoverRemove();
        });

        // Assign click handler: Select item.
        _.els.dropdownOptions.on('click', function (event) {
          event.preventDefault();
          if (_._multiselect) {
            $dropdown.one('hide.bs.dropdown', function (event) {
              event.preventDefault();
            });
          }
          _.toggle($(this));
        });

        // Assign click handler: Deselect all.
        _.els.controlDeselect.on('click', function (event) {
          event.preventDefault();
          $dropdown.one('hide.bs.dropdown', function (event) {
            event.preventDefault();
          });
          if (!$(this).hasClass('disabled')) {
            _.deselectAll();
          }
        });

        // Assign click handler: Show selected.
        _.els.controlSelected.on('click', function (event) {
          event.preventDefault();
          $dropdown.one('hide.bs.dropdown', function (event) {
            event.preventDefault();
          });
          if (!$(this).hasClass('disabled')) {
            _.sortSelected();
          }
        });

        // Assign click handler: Clear search.
        _.els.buttonClear.on('click', function () {
          _.els.controlSearch.val('');
          if (_.dropdownActive()) {
            $dropdown.one('hide.bs.dropdown', function (event) {
              event.preventDefault();
            });
          }
          _.refresh();
        });

        // Assign click handler: No results.
        _.els.dropdownItemNoResults.on('click', function (event) {
          event.preventDefault();
          $dropdown.one('hide.bs.dropdown', function (event) {
            event.preventDefault();
          });
        });

        // On search focus: Toggle dropdown.
        // - Can reliance on setTimeout be removed?
        // - Should we depend on an aria attribute for plugin logic?
        if (_._config.search) {
          _.els.controlSearch.on('focusin', function () {
            if (_.els.button.attr('aria-expanded') == 'false') {
              _.els.button.dropdown('toggle');
              setTimeout(function () {
                _.els.controlSearch.focus();
              }, 1);
            }
          });
        }

        _.refreshInitialControls();

        // DOM mutation observer
        if (_._config.observeDomMutations) {
          var config = { childList: true, subtree: true };
          var callback = function callback(mutationsList) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var mutation = _step.value;

                if (mutation.type == 'childList') {
                  _.refresh();
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          };
          var observer = new MutationObserver(callback);
          observer.observe($el[0], config);
        }
      }

      /**
       * Check whether the supplied element has a `multiple` attribute,
       * @param  {object}  element
       * @return {Boolean}
       */

    }, {
      key: '_isMultiselect',
      value: function _isMultiselect(element) {
        var attrMultiple = $(element).attr('multiple');
        if ((typeof attrMultiple === 'undefined' ? 'undefined' : _typeof(attrMultiple)) !== ( true ? 'undefined' : _typeof(undefined)) && attrMultiple !== false) {
          return true;
        }
        return false;
      }
    }, {
      key: '_search',
      value: function _search(s) {
        var results = null;
        if ($.trim(s) == '') {
          this.refresh();
          if (this._lastSearch !== null) {
            this._resultsChanged = true;
            this._lastSearch = null;
          }
          return;
        } else {
          var fuse = new _fuse2.default(this._haystack, this._fuseOptions);
          results = fuse.search(s);
        }
        this._resultsChanged = true;
        if (results) {
          if (typeof this._lastSearch !== null && this.arraysEqual(results, this._lastSearch)) {
            this._resultsChanged = false;
          }
        } else {
          this.refresh();
          return;
        }
        if (this._resultsChanged) {
          this.hoverSet(results[0]);
          this.hide(results);
          this.reorder(results);
          this.resetScroll();
        }
        this._lastSearch = results;
      }
    }, {
      key: 'buildDropdown',
      value: function buildDropdown() {
        var _ = this;

        var $dropdown = $('<div>', {
          id: _.ids.dropdownContainerId,
          class: ClassName.DROPDOWN
        });

        if (_._config.search) {

          // Build dropdown.
          $dropdown.append($('<div>', {
            class: 'input-group'
          }).append(_.els.controlSearch).append($('<div>', {
            class: 'input-group-append'
          }).append(_.els.buttonClear)).append($('<div>', {
            class: 'input-group-append'
          }).append(_.els.button)));

          // Move dropdown menu to the right.
          _.els.dropdown.addClass('dropdown-menu-right');
        } else {

          // Build dropdown.
          $dropdown.append(_.els.button);
        }

        return $dropdown;
      }
    }, {
      key: 'buildButton',
      value: function buildButton() {
        var _ = this;
        return $('<button>', {
          class: _._config.classBtnSearch + ' dropdown-toggle',
          type: 'button',
          id: _.ids.dropdownButtonId,
          'data-toggle': 'dropdown',
          'data-target': '#' + _.ids.dropdownContainerId,
          'aria-haspopup': 'true',
          'aria-expanded': 'false'
        });
      }
    }, {
      key: 'buildButtonClear',
      value: function buildButtonClear() {
        var _ = this;
        return $('<button>', {
          type: 'button',
          class: _._config.classBtnClear
        }).html(_._config.htmlClear);
      }
    }, {
      key: 'buildcontrolSearch',
      value: function buildcontrolSearch() {
        var _ = this;
        return $('<input>', {
          type: 'text',
          class: 'form-control',
          placeholder: 'Search',
          'aria-label': 'Search',
          'aria-describedby': _.ids.controlSearchId
        });
      }
    }, {
      key: 'buildDropdownMenu',
      value: function buildDropdownMenu() {
        var _ = this;
        var $dropdownMenu = $('<div>', {
          class: ClassName.MENU,
          'aria-labelledby': _.ids.dropdownButtonId
        });
        if (_._config.maxHeight) {
          $dropdownMenu.css({
            'height': 'auto',
            'max-height': _._config.maxHeight,
            'overflow-x': 'hidden'
          });
        }
        return $dropdownMenu;
      }
    }, {
      key: 'buildDropdownItemsContainer',
      value: function buildDropdownItemsContainer() {
        return $('<div>');
      }
    }, {
      key: 'buildDropdownItems',
      value: function buildDropdownItems() {
        var _ = this;
        var $el = $(_._element);
        var s = 0; // Sort index
        var o = 0; // Option index
        var $items = $();
        var $optgroups = $el.find('optgroup');
        if ($optgroups.length) {
          $optgroups.each(function () {
            $items = $items.add(_.buildDropdownHeader($(this).attr('label')).data('index', s));
            s = _.incrementIndex(s);
            $(this).find('option').each(function () {
              $items = $items.add(_.buildDropdownItem($(this)).data('index', s).data('option', o));
              s = _.incrementIndex(s);
              o++;
            });
          });
        } else {
          $el.find('option').each(function (index, value) {
            $items = $items.add(_.buildDropdownItem($(this)).data('index', s).data('option', o));
            s = _.incrementIndex(s);
            o++;
          });
        }
        if (_._config.search) {
          $items = $items.add(_.els.dropdownItemNoResults);
        }
        return $items;
      }
    }, {
      key: 'incrementIndex',
      value: function incrementIndex(index) {
        var _ = this;
        _._indexes.push(index.toString());
        index++;
        return index;
      }
    }, {
      key: 'buildDropdownHeader',
      value: function buildDropdownHeader(text) {
        return $('<h6>', {
          class: 'dropdown-header',
          text: text
        });
      }
    }, {
      key: 'buildDropdownItem',
      value: function buildDropdownItem($option) {
        var _ = this;
        var $dropdownItem = $('<a>', {
          href: '#',
          class: ClassName.ITEM,
          text: $option.text()
        });
        if ($option.is(':selected')) {
          $dropdownItem.addClass('active');
        }
        return $dropdownItem;
      }
    }, {
      key: 'buildDropdownItemNoResults',
      value: function buildDropdownItemNoResults() {
        var _ = this;
        return $('<span>', {
          class: ClassName.ITEM + ' ' + 'text-muted no-results',
          text: _._config.textNoResults
        }).hide();
      }
    }, {
      key: 'buildDeselectAll',
      value: function buildDeselectAll() {
        var _ = this;
        var $deselectItem = $('<a>', {
          href: '#',
          id: _.ids.dropdownItemDeselect,
          class: ClassName.ITEM,
          text: 'Deselect all'
        });
        return $deselectItem;
      }
    }, {
      key: 'buildShowSelected',
      value: function buildShowSelected() {
        var _ = this;
        var $showSelectedItem = $('<a>', {
          href: '#',
          id: _.ids.dropdownItemShowSelected,
          class: ClassName.ITEM,
          text: 'Show selected'
        });
        return $showSelectedItem;
      }
    }, {
      key: 'dropdownActive',
      value: function dropdownActive() {
        var _ = this;
        if (_.els.dropdown.hasClass('show')) {
          return true;
        }
        return false;
      }

      /**
       * Check if a dropdown item refers to a select option.
       * @param  {object}  $item jQuery object.
       * @return {Boolean}
       */

    }, {
      key: 'isOption',
      value: function isOption($item) {
        var attr = $item.data('option');
        if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) !== ( true ? 'undefined' : _typeof(undefined)) && attr !== false) {
          return true;
        }
        return false;
      }
    }, {
      key: 'setButtonText',
      value: function setButtonText() {
        var _ = this;
        var $el = $(_._element);
        var $btn = _.els.button;
        var selected = $el.val();
        if (selected.length < 1) {
          $btn.text(_._config.textNoneSelected);
        } else if (selected.length <= _._config.maxListLength) {
          var textValues = $el.find('option:selected').map(function (i, element) {
            return $(element).text();
          }).get();
          $btn.text(textValues.join(", "));
        } else {
          $btn.text(_._config.textMultipleSelected);
        }
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        var _ = this;
        _.hoverRemove();
        _.els.dropdownItemNoResults.hide();
        _.sortReset();
        _.showInitialControls();
      }
    }, {
      key: 'hide',
      value: function hide(results) {
        var _ = this;
        var notResults = $(_._indexes).not(results).get();
        $.each(notResults, function (index, value) {
          _.dropdownItemByIndex(value).hide();
        });
        _.els.button.dropdown('update');
      }
    }, {
      key: 'dropdownItemByIndex',
      value: function dropdownItemByIndex(index) {
        var _ = this;
        return _.els.dropdownItems.filter(function () {
          return $(this).data('index') == index;
        });
      }
    }, {
      key: 'hideInitialControls',
      value: function hideInitialControls() {
        var _ = this;
        _.els.controlDeselect.hide();
        _.els.controlSelected.hide();
      }
    }, {
      key: 'showInitialControls',
      value: function showInitialControls(prepend) {
        prepend = (typeof prepend === 'undefined' ? 'undefined' : _typeof(prepend)) !== ( true ? 'undefined' : _typeof(undefined)) ? prepend : false;
        var _ = this;
        if (prepend) {
          _.els.controlSelected.prependTo(_.els.dropdown);
          _.els.controlDeselect.prependTo(_.els.dropdown);
        }
        _.els.controlSelected.show();
        _.els.controlDeselect.show();
      }
    }, {
      key: 'refreshInitialControls',
      value: function refreshInitialControls() {
        var _ = this;
        var $el = $(_._element);
        if (!$el.val() || $el.val().length == 0) {
          _.els.controlDeselect.addClass('disabled');
          _.els.controlSelected.addClass('disabled');
        } else {
          _.els.controlDeselect.removeClass('disabled');
          _.els.controlSelected.removeClass('disabled');
        }
      }

      /**
       * Sort: Reset sort order.
       * @return void
       */

    }, {
      key: 'sortReset',
      value: function sortReset() {
        var _ = this;
        var i;
        for (i = _.els.dropdownItems.length; i >= 0; i--) {
          _.dropdownItemByIndex(i).prependTo(_.els.dropdownItemsContainer);
        }
      }

      /**
       * Sort: Order by array values.
       *
       * Reorder according to an array of index values. The order of the index
       * array is preserved, to make change detection easier elsewhere.
       * @param  {array} indexes Array of index values (strings).
       * @return void
       */

    }, {
      key: 'reorder',
      value: function reorder(indexes) {
        var _ = this;
        _.els.dropdownItemNoResults.hide();
        if ((typeof indexes === 'undefined' ? 'undefined' : _typeof(indexes)) === ( true ? 'undefined' : _typeof(undefined)) || indexes.length == 0) {
          _.els.dropdownItemNoResults.show();
          return;
        }
        var indexesReversed = indexes.slice(0); // Clone
        indexesReversed = indexesReversed.reverse();
        $.each(indexesReversed, function (index, value) {
          _.dropdownItemByIndex(value).prependTo(_.els.dropdownItemsContainer);
        });
        _.hideInitialControls();
      }

      /**
       * Sort: Move selected items to the top.
       * @return void
       */

    }, {
      key: 'sortSelected',
      value: function sortSelected() {
        var _ = this;
        var $el = $(_._element);
        _.els.dropdownOptions.removeClass(ClassName.HOVER);
        $(_.els.dropdown.find('.active').get().reverse()).each(function () {
          $(this).prependTo(_.els.dropdownItemsContainer);
        });
        _.showInitialControls(true);
        _.resetScroll();
      }

      /**
       * Helper: Reset scroll.
       *
       * Scroll the dropdown menu to the top.
       * @return {[type]} [description]
       */

    }, {
      key: 'resetScroll',
      value: function resetScroll() {
        var _ = this;
        _.els.dropdown.animate({
          scrollTop: 0
        }, 50);
      }

      /**
       * Helper: Class to selector.
       *
       * Convert a space separated class list to a selector.
       * @param  {string} classList Space separated list of classes.
       * @return {string}           Selector.
       */

    }, {
      key: 'classListToSelector',
      value: function classListToSelector(classList) {
        var selector = classList;
        if (classList.length) {
          var classes = classList.split(/\s+/);
          selector = '.' + classes.join('.');
        }
        return selector;
      }

      /**
       * Helper: Compare two arrays.
       *
       * @see https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
       */

    }, {
      key: 'arraysEqual',
      value: function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }

      // Static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = Object.assign({}, SelectDropdown.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config, {
            SelectDropdownIndex: SelectDropdownIndex
          });

          SelectDropdownIndex++;

          if (!data) {
            data = new SelectDropdown(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError('No method named "' + config + '"');
            }
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return SelectDropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  /** Todo. Move keydown events here */

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = SelectDropdown._jQueryInterface;
  $.fn[NAME].Constructor = SelectDropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return SelectDropdown._jQueryInterface;
  };

  return SelectDropdown;
}(_jquery2.default, _fuse2.default);

exports.default = SelectDropdown;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

const Util = (($) => {
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  let transition = false

  const MAX_UID = 1000000

  // Shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments) // eslint-disable-line prefer-rest-params
        }
        return undefined // eslint-disable-line no-undefined
      }
    }
  }

  function transitionEndTest() {
    if (typeof window !== 'undefined' && window.QUnit) {
      return false
    }

    return {
      end: 'transitionend'
    }
  }

  function transitionEndEmulator(duration) {
    let called = false

    $(this).one(Util.TRANSITION_END, () => {
      called = true
    })

    setTimeout(() => {
      if (!called) {
        Util.triggerTransitionEnd(this)
      }
    }, duration)

    return this
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest()

    $.fn.emulateTransitionEnd = transitionEndEmulator

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent()
    }
  }

  function escapeId(selector) {
    // We escape IDs in case of special selectors (selector = '#myId:something')
    // $.escapeSelector does not exist in jQuery < 3
    selector = typeof $.escapeSelector === 'function' ? $.escapeSelector(selector).substr(1)
      : selector.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1')

    return selector
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  const Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID) // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix))
      return prefix
    },

    getSelectorFromElement(element) {
      let selector = element.getAttribute('data-target')
      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || ''
      }

      // If it's an ID
      if (selector.charAt(0) === '#') {
        selector = escapeId(selector)
      }

      try {
        const $selector = $(document).find(selector)
        return $selector.length > 0 ? selector : null
      } catch (err) {
        return null
      }
    },

    reflow(element) {
      return element.offsetHeight
    },

    triggerTransitionEnd(element) {
      $(element).trigger(transition.end)
    },

    supportsTransitionEnd() {
      return Boolean(transition)
    },

    isElement(obj) {
      return (obj[0] || obj).nodeType
    },

    typeCheckConfig(componentName, config, configTypes) {
      for (const property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          const expectedTypes = configTypes[property]
          const value         = config[property]
          const valueType     = value && Util.isElement(value)
            ? 'element' : toType(value)

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(
              `${componentName.toUpperCase()}: ` +
              `Option "${property}" provided type "${valueType}" ` +
              `but expected type "${expectedTypes}".`)
          }
        }
      }
    }
  }

  setTransitionEndSupport()

  return Util
})(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a)

/* harmony default export */ __webpack_exports__["default"] = (Util);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Fuse.js v3.2.0 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Fuse", [], factory);
	else if(typeof exports === 'object')
		exports["Fuse"] = factory();
	else
		root["Fuse"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bitapRegexSearch = __webpack_require__(5);
var bitapSearch = __webpack_require__(7);
var patternAlphabet = __webpack_require__(4);

var Bitap = function () {
  function Bitap(pattern, _ref) {
    var _ref$location = _ref.location,
        location = _ref$location === undefined ? 0 : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === undefined ? 100 : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
        _ref$maxPatternLength = _ref.maxPatternLength,
        maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
        _ref$isCaseSensitive = _ref.isCaseSensitive,
        isCaseSensitive = _ref$isCaseSensitive === undefined ? false : _ref$isCaseSensitive,
        _ref$tokenSeparator = _ref.tokenSeparator,
        tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

    _classCallCheck(this, Bitap);

    this.options = {
      location: location,
      distance: distance,
      threshold: threshold,
      maxPatternLength: maxPatternLength,
      isCaseSensitive: isCaseSensitive,
      tokenSeparator: tokenSeparator,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength
    };

    this.pattern = this.options.isCaseSensitive ? pattern : pattern.toLowerCase();

    if (this.pattern.length <= maxPatternLength) {
      this.patternAlphabet = patternAlphabet(this.pattern);
    }
  }

  _createClass(Bitap, [{
    key: 'search',
    value: function search(text) {
      if (!this.options.isCaseSensitive) {
        text = text.toLowerCase();
      }

      // Exact match
      if (this.pattern === text) {
        return {
          isMatch: true,
          score: 0,
          matchedIndices: [[0, text.length - 1]]
        };
      }

      // When pattern length is greater than the machine word length, just do a a regex comparison
      var _options = this.options,
          maxPatternLength = _options.maxPatternLength,
          tokenSeparator = _options.tokenSeparator;

      if (this.pattern.length > maxPatternLength) {
        return bitapRegexSearch(text, this.pattern, tokenSeparator);
      }

      // Otherwise, use Bitap algorithm
      var _options2 = this.options,
          location = _options2.location,
          distance = _options2.distance,
          threshold = _options2.threshold,
          findAllMatches = _options2.findAllMatches,
          minMatchCharLength = _options2.minMatchCharLength;

      return bitapSearch(text, this.pattern, this.patternAlphabet, {
        location: location,
        distance: distance,
        threshold: threshold,
        findAllMatches: findAllMatches,
        minMatchCharLength: minMatchCharLength
      });
    }
  }]);

  return Bitap;
}();

// let x = new Bitap("od mn war", {})
// let result = x.search("Old Man's War")
// console.log(result)

module.exports = Bitap;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(0);

var deepValue = function deepValue(obj, path, list) {
  if (!path) {
    // If there's no path left, we've gotten to the object we care about.
    list.push(obj);
  } else {
    var dotIndex = path.indexOf('.');
    var firstSegment = path;
    var remaining = null;

    if (dotIndex !== -1) {
      firstSegment = path.slice(0, dotIndex);
      remaining = path.slice(dotIndex + 1);
    }

    var value = obj[firstSegment];

    if (value !== null && value !== undefined) {
      if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
        list.push(value.toString());
      } else if (isArray(value)) {
        // Search each item in the array.
        for (var i = 0, len = value.length; i < len; i += 1) {
          deepValue(value[i], remaining, list);
        }
      } else if (remaining) {
        // An object. Recurse further.
        deepValue(value, remaining, list);
      }
    }
  }

  return list;
};

module.exports = function (obj, path) {
  return deepValue(obj, path, []);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var matchedIndices = [];
  var start = -1;
  var end = -1;
  var i = 0;

  for (var len = matchmask.length; i < len; i += 1) {
    var match = matchmask[i];
    if (match && start === -1) {
      start = i;
    } else if (!match && start !== -1) {
      end = i - 1;
      if (end - start + 1 >= minMatchCharLength) {
        matchedIndices.push([start, end]);
      }
      start = -1;
    }
  }

  // (i-1 - start) + 1 => i - start
  if (matchmask[i - 1] && i - start >= minMatchCharLength) {
    matchedIndices.push([start, i - 1]);
  }

  return matchedIndices;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (pattern) {
  var mask = {};
  var len = pattern.length;

  for (var i = 0; i < len; i += 1) {
    mask[pattern.charAt(i)] = 0;
  }

  for (var _i = 0; _i < len; _i += 1) {
    mask[pattern.charAt(_i)] |= 1 << len - _i - 1;
  }

  return mask;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

module.exports = function (text, pattern) {
  var tokenSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : / +/g;

  var regex = new RegExp(pattern.replace(SPECIAL_CHARS_REGEX, '\\$&').replace(tokenSeparator, '|'));
  var matches = text.match(regex);
  var isMatch = !!matches;
  var matchedIndices = [];

  if (isMatch) {
    for (var i = 0, matchesLen = matches.length; i < matchesLen; i += 1) {
      var match = matches[i];
      matchedIndices.push([text.indexOf(match), match.length - 1]);
    }
  }

  return {
    // TODO: revisit this score
    score: isMatch ? 0.5 : 1,
    isMatch: isMatch,
    matchedIndices: matchedIndices
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (pattern, _ref) {
  var _ref$errors = _ref.errors,
      errors = _ref$errors === undefined ? 0 : _ref$errors,
      _ref$currentLocation = _ref.currentLocation,
      currentLocation = _ref$currentLocation === undefined ? 0 : _ref$currentLocation,
      _ref$expectedLocation = _ref.expectedLocation,
      expectedLocation = _ref$expectedLocation === undefined ? 0 : _ref$expectedLocation,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 100 : _ref$distance;

  var accuracy = errors / pattern.length;
  var proximity = Math.abs(expectedLocation - currentLocation);

  if (!distance) {
    // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy;
  }

  return accuracy + proximity / distance;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bitapScore = __webpack_require__(6);
var matchedIndices = __webpack_require__(3);

module.exports = function (text, pattern, patternAlphabet, _ref) {
  var _ref$location = _ref.location,
      location = _ref$location === undefined ? 0 : _ref$location,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 100 : _ref$distance,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
      _ref$findAllMatches = _ref.findAllMatches,
      findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
      _ref$minMatchCharLeng = _ref.minMatchCharLength,
      minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

  var expectedLocation = location;
  // Set starting location at beginning text and initialize the alphabet.
  var textLen = text.length;
  // Highest score beyond which we give up.
  var currentThreshold = threshold;
  // Is there a nearby exact match? (speedup)
  var bestLocation = text.indexOf(pattern, expectedLocation);

  var patternLen = pattern.length;

  // a mask of the matches
  var matchMask = [];
  for (var i = 0; i < textLen; i += 1) {
    matchMask[i] = 0;
  }

  if (bestLocation !== -1) {
    var score = bitapScore(pattern, {
      errors: 0,
      currentLocation: bestLocation,
      expectedLocation: expectedLocation,
      distance: distance
    });
    currentThreshold = Math.min(score, currentThreshold);

    // What about in the other direction? (speed up)
    bestLocation = text.lastIndexOf(pattern, expectedLocation + patternLen);

    if (bestLocation !== -1) {
      var _score = bitapScore(pattern, {
        errors: 0,
        currentLocation: bestLocation,
        expectedLocation: expectedLocation,
        distance: distance
      });
      currentThreshold = Math.min(_score, currentThreshold);
    }
  }

  // Reset the best location
  bestLocation = -1;

  var lastBitArr = [];
  var finalScore = 1;
  var binMax = patternLen + textLen;

  var mask = 1 << patternLen - 1;

  for (var _i = 0; _i < patternLen; _i += 1) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from the match location we can stray
    // at this error level.
    var binMin = 0;
    var binMid = binMax;

    while (binMin < binMid) {
      var _score3 = bitapScore(pattern, {
        errors: _i,
        currentLocation: expectedLocation + binMid,
        expectedLocation: expectedLocation,
        distance: distance
      });

      if (_score3 <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }

      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }

    // Use the result from this iteration as the maximum for the next.
    binMax = binMid;

    var start = Math.max(1, expectedLocation - binMid + 1);
    var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;

    // Initialize the bit array
    var bitArr = Array(finish + 2);

    bitArr[finish + 1] = (1 << _i) - 1;

    for (var j = finish; j >= start; j -= 1) {
      var currentLocation = j - 1;
      var charMatch = patternAlphabet[text.charAt(currentLocation)];

      if (charMatch) {
        matchMask[currentLocation] = 1;
      }

      // First pass: exact match
      bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;

      // Subsequent passes: fuzzy match
      if (_i !== 0) {
        bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
      }

      if (bitArr[j] & mask) {
        finalScore = bitapScore(pattern, {
          errors: _i,
          currentLocation: currentLocation,
          expectedLocation: expectedLocation,
          distance: distance
        });

        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (finalScore <= currentThreshold) {
          // Indeed it is
          currentThreshold = finalScore;
          bestLocation = currentLocation;

          // Already passed `loc`, downhill from here on in.
          if (bestLocation <= expectedLocation) {
            break;
          }

          // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }

    // No hope for a (better) match at greater error levels.
    var _score2 = bitapScore(pattern, {
      errors: _i + 1,
      currentLocation: expectedLocation,
      expectedLocation: expectedLocation,
      distance: distance
    });

    if (_score2 > currentThreshold) {
      break;
    }

    lastBitArr = bitArr;
  }

  // Count exact matches (those with a score of 0) to be "almost" exact
  return {
    isMatch: bestLocation >= 0,
    score: finalScore === 0 ? 0.001 : finalScore,
    matchedIndices: matchedIndices(matchMask, minMatchCharLength)
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bitap = __webpack_require__(1);
var deepValue = __webpack_require__(2);
var isArray = __webpack_require__(0);

var Fuse = function () {
  function Fuse(list, _ref) {
    var _ref$location = _ref.location,
        location = _ref$location === undefined ? 0 : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === undefined ? 100 : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
        _ref$maxPatternLength = _ref.maxPatternLength,
        maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
        _ref$caseSensitive = _ref.caseSensitive,
        caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
        _ref$tokenSeparator = _ref.tokenSeparator,
        tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? null : _ref$id,
        _ref$keys = _ref.keys,
        keys = _ref$keys === undefined ? [] : _ref$keys,
        _ref$shouldSort = _ref.shouldSort,
        shouldSort = _ref$shouldSort === undefined ? true : _ref$shouldSort,
        _ref$getFn = _ref.getFn,
        getFn = _ref$getFn === undefined ? deepValue : _ref$getFn,
        _ref$sortFn = _ref.sortFn,
        sortFn = _ref$sortFn === undefined ? function (a, b) {
      return a.score - b.score;
    } : _ref$sortFn,
        _ref$tokenize = _ref.tokenize,
        tokenize = _ref$tokenize === undefined ? false : _ref$tokenize,
        _ref$matchAllTokens = _ref.matchAllTokens,
        matchAllTokens = _ref$matchAllTokens === undefined ? false : _ref$matchAllTokens,
        _ref$includeMatches = _ref.includeMatches,
        includeMatches = _ref$includeMatches === undefined ? false : _ref$includeMatches,
        _ref$includeScore = _ref.includeScore,
        includeScore = _ref$includeScore === undefined ? false : _ref$includeScore,
        _ref$verbose = _ref.verbose,
        verbose = _ref$verbose === undefined ? false : _ref$verbose;

    _classCallCheck(this, Fuse);

    this.options = {
      location: location,
      distance: distance,
      threshold: threshold,
      maxPatternLength: maxPatternLength,
      isCaseSensitive: caseSensitive,
      tokenSeparator: tokenSeparator,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength,
      id: id,
      keys: keys,
      includeMatches: includeMatches,
      includeScore: includeScore,
      shouldSort: shouldSort,
      getFn: getFn,
      sortFn: sortFn,
      verbose: verbose,
      tokenize: tokenize,
      matchAllTokens: matchAllTokens
    };

    this.setCollection(list);
  }

  _createClass(Fuse, [{
    key: 'setCollection',
    value: function setCollection(list) {
      this.list = list;
      return list;
    }
  }, {
    key: 'search',
    value: function search(pattern) {
      this._log('---------\nSearch pattern: "' + pattern + '"');

      var _prepareSearchers2 = this._prepareSearchers(pattern),
          tokenSearchers = _prepareSearchers2.tokenSearchers,
          fullSearcher = _prepareSearchers2.fullSearcher;

      var _search2 = this._search(tokenSearchers, fullSearcher),
          weights = _search2.weights,
          results = _search2.results;

      this._computeScore(weights, results);

      if (this.options.shouldSort) {
        this._sort(results);
      }

      return this._format(results);
    }
  }, {
    key: '_prepareSearchers',
    value: function _prepareSearchers() {
      var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var tokenSearchers = [];

      if (this.options.tokenize) {
        // Tokenize on the separator
        var tokens = pattern.split(this.options.tokenSeparator);
        for (var i = 0, len = tokens.length; i < len; i += 1) {
          tokenSearchers.push(new Bitap(tokens[i], this.options));
        }
      }

      var fullSearcher = new Bitap(pattern, this.options);

      return { tokenSearchers: tokenSearchers, fullSearcher: fullSearcher };
    }
  }, {
    key: '_search',
    value: function _search() {
      var tokenSearchers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var fullSearcher = arguments[1];

      var list = this.list;
      var resultMap = {};
      var results = [];

      // Check the first item in the list, if it's a string, then we assume
      // that every item in the list is also a string, and thus it's a flattened array.
      if (typeof list[0] === 'string') {
        // Iterate over every item
        for (var i = 0, len = list.length; i < len; i += 1) {
          this._analyze({
            key: '',
            value: list[i],
            record: i,
            index: i
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }

        return { weights: null, results: results };
      }

      // Otherwise, the first item is an Object (hopefully), and thus the searching
      // is done on the values of the keys of each item.
      var weights = {};
      for (var _i = 0, _len = list.length; _i < _len; _i += 1) {
        var item = list[_i];
        // Iterate over every key
        for (var j = 0, keysLen = this.options.keys.length; j < keysLen; j += 1) {
          var key = this.options.keys[j];
          if (typeof key !== 'string') {
            weights[key.name] = {
              weight: 1 - key.weight || 1
            };
            if (key.weight <= 0 || key.weight > 1) {
              throw new Error('Key weight has to be > 0 and <= 1');
            }
            key = key.name;
          } else {
            weights[key] = {
              weight: 1
            };
          }

          this._analyze({
            key: key,
            value: this.options.getFn(item, key),
            record: item,
            index: _i
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }
      }

      return { weights: weights, results: results };
    }
  }, {
    key: '_analyze',
    value: function _analyze(_ref2, _ref3) {
      var key = _ref2.key,
          _ref2$arrayIndex = _ref2.arrayIndex,
          arrayIndex = _ref2$arrayIndex === undefined ? -1 : _ref2$arrayIndex,
          value = _ref2.value,
          record = _ref2.record,
          index = _ref2.index;
      var _ref3$tokenSearchers = _ref3.tokenSearchers,
          tokenSearchers = _ref3$tokenSearchers === undefined ? [] : _ref3$tokenSearchers,
          _ref3$fullSearcher = _ref3.fullSearcher,
          fullSearcher = _ref3$fullSearcher === undefined ? [] : _ref3$fullSearcher,
          _ref3$resultMap = _ref3.resultMap,
          resultMap = _ref3$resultMap === undefined ? {} : _ref3$resultMap,
          _ref3$results = _ref3.results,
          results = _ref3$results === undefined ? [] : _ref3$results;

      // Check if the texvaluet can be searched
      if (value === undefined || value === null) {
        return;
      }

      var exists = false;
      var averageScore = -1;
      var numTextMatches = 0;

      if (typeof value === 'string') {
        this._log('\nKey: ' + (key === '' ? '-' : key));

        var mainSearchResult = fullSearcher.search(value);
        this._log('Full text: "' + value + '", score: ' + mainSearchResult.score);

        if (this.options.tokenize) {
          var words = value.split(this.options.tokenSeparator);
          var scores = [];

          for (var i = 0; i < tokenSearchers.length; i += 1) {
            var tokenSearcher = tokenSearchers[i];

            this._log('\nPattern: "' + tokenSearcher.pattern + '"');

            // let tokenScores = []
            var hasMatchInText = false;

            for (var j = 0; j < words.length; j += 1) {
              var word = words[j];
              var tokenSearchResult = tokenSearcher.search(word);
              var obj = {};
              if (tokenSearchResult.isMatch) {
                obj[word] = tokenSearchResult.score;
                exists = true;
                hasMatchInText = true;
                scores.push(tokenSearchResult.score);
              } else {
                obj[word] = 1;
                if (!this.options.matchAllTokens) {
                  scores.push(1);
                }
              }
              this._log('Token: "' + word + '", score: ' + obj[word]);
              // tokenScores.push(obj)
            }

            if (hasMatchInText) {
              numTextMatches += 1;
            }
          }

          averageScore = scores[0];
          var scoresLen = scores.length;
          for (var _i2 = 1; _i2 < scoresLen; _i2 += 1) {
            averageScore += scores[_i2];
          }
          averageScore = averageScore / scoresLen;

          this._log('Token score average:', averageScore);
        }

        var finalScore = mainSearchResult.score;
        if (averageScore > -1) {
          finalScore = (finalScore + averageScore) / 2;
        }

        this._log('Score average:', finalScore);

        var checkTextMatches = this.options.tokenize && this.options.matchAllTokens ? numTextMatches >= tokenSearchers.length : true;

        this._log('\nCheck Matches: ' + checkTextMatches);

        // If a match is found, add the item to <rawResults>, including its score
        if ((exists || mainSearchResult.isMatch) && checkTextMatches) {
          // Check if the item already exists in our results
          var existingResult = resultMap[index];
          if (existingResult) {
            // Use the lowest score
            // existingResult.score, bitapResult.score
            existingResult.output.push({
              key: key,
              arrayIndex: arrayIndex,
              value: value,
              score: finalScore,
              matchedIndices: mainSearchResult.matchedIndices
            });
          } else {
            // Add it to the raw result list
            resultMap[index] = {
              item: record,
              output: [{
                key: key,
                arrayIndex: arrayIndex,
                value: value,
                score: finalScore,
                matchedIndices: mainSearchResult.matchedIndices
              }]
            };

            results.push(resultMap[index]);
          }
        }
      } else if (isArray(value)) {
        for (var _i3 = 0, len = value.length; _i3 < len; _i3 += 1) {
          this._analyze({
            key: key,
            arrayIndex: _i3,
            value: value[_i3],
            record: record,
            index: index
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }
      }
    }
  }, {
    key: '_computeScore',
    value: function _computeScore(weights, results) {
      this._log('\n\nComputing score:\n');

      for (var i = 0, len = results.length; i < len; i += 1) {
        var output = results[i].output;
        var scoreLen = output.length;

        var totalScore = 0;
        var bestScore = 1;

        for (var j = 0; j < scoreLen; j += 1) {
          var weight = weights ? weights[output[j].key].weight : 1;
          var score = weight === 1 ? output[j].score : output[j].score || 0.001;
          var nScore = score * weight;

          if (weight !== 1) {
            bestScore = Math.min(bestScore, nScore);
          } else {
            output[j].nScore = nScore;
            totalScore += nScore;
          }
        }

        results[i].score = bestScore === 1 ? totalScore / scoreLen : bestScore;

        this._log(results[i]);
      }
    }
  }, {
    key: '_sort',
    value: function _sort(results) {
      this._log('\n\nSorting....');
      results.sort(this.options.sortFn);
    }
  }, {
    key: '_format',
    value: function _format(results) {
      var finalOutput = [];

      this._log('\n\nOutput:\n\n', JSON.stringify(results));

      var transformers = [];

      if (this.options.includeMatches) {
        transformers.push(function (result, data) {
          var output = result.output;
          data.matches = [];

          for (var i = 0, len = output.length; i < len; i += 1) {
            var item = output[i];

            if (item.matchedIndices.length === 0) {
              continue;
            }

            var obj = {
              indices: item.matchedIndices,
              value: item.value
            };
            if (item.key) {
              obj.key = item.key;
            }
            if (item.hasOwnProperty('arrayIndex') && item.arrayIndex > -1) {
              obj.arrayIndex = item.arrayIndex;
            }
            data.matches.push(obj);
          }
        });
      }

      if (this.options.includeScore) {
        transformers.push(function (result, data) {
          data.score = result.score;
        });
      }

      for (var i = 0, len = results.length; i < len; i += 1) {
        var result = results[i];

        if (this.options.id) {
          result.item = this.options.getFn(result.item, this.options.id)[0];
        }

        if (!transformers.length) {
          finalOutput.push(result.item);
          continue;
        }

        var data = {
          item: result.item
        };

        for (var j = 0, _len2 = transformers.length; j < _len2; j += 1) {
          transformers[j](result, data);
        }

        finalOutput.push(data);
      }

      return finalOutput;
    }
  }, {
    key: '_log',
    value: function _log() {
      if (this.options.verbose) {
        var _console;

        (_console = console).log.apply(_console, arguments);
      }
    }
  }]);

  return Fuse;
}();

module.exports = Fuse;

/***/ })
/******/ ]);
});
//# sourceMappingURL=fuse.js.map

/***/ })
/******/ ]);