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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = Fuse;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


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
})(jquery__WEBPACK_IMPORTED_MODULE_0___default.a)

/* harmony default export */ __webpack_exports__["default"] = (Util);


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

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

var _fuse = __webpack_require__(1);

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
    // Profile
    profile: "default",
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
    // Buttons
    btnClear: true,
    btnDeselectAll: true, // Multiselect only
    btnSelectAll: true, // Multiselect only
    // HTML
    htmlBtnClear: "Clear search",
    htmlBtnDeselectAll: "Deselect all", // Multiselect only
    htmlBtnSelectAll: "Select all", // Multiselect only
    // Classes
    classBtnClear: "btn btn-outline-secondary",
    classBtnDeselectAll: "btn btn-outline-secondary", // Multiselect only
    classBtnSelectAll: "btn btn-outline-secondary", // Multiselect only
    classBtnSelect: "btn btn-primary"
  };

  var DefaultType = {
    profile: 'string',
    maxListLength: 'number',
    hideSelect: 'boolean',
    search: 'boolean',
    observeDomMutations: 'boolean',
    maxHeight: 'string',
    keyboard: 'boolean',
    textNoneSelected: 'string',
    textMultipleSelected: 'string',
    textNoResults: 'string',
    btnClear: 'boolean',
    btnDeselectAll: 'boolean',
    btnSelectAll: 'boolean',
    htmlBtnClear: 'string',
    htmlBtnDeselectAll: 'string',
    htmlBtnSelectAll: 'string',
    classBtnClear: 'string',
    classBtnDeselectAll: 'string',
    classBtnSelectAll: 'string',
    classBtnSelect: 'string'
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
    BTN_GROUP: 'btn-group',
    INPUT_GROUP: 'input-group',
    INPUT_GROUP_APPEND: 'input-group-append',
    HOVER: 'hover',
    ALIGNMENT_RIGHT: 'dropdown-menu-right'
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

      this._multiselect = this._isMultiselect(element);

      this._config = this._getConfig(config);
      this._element = element;
      this._prefix = 'bsd' + this._config.SelectDropdownIndex + '-';

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
      this.els.btnSelect = this._buildBtnSelect();
      if (this._config.search) {
        this.els.controlSearch = this._buildControlSearch();
      }
      if (this._config.btnClear) {
        this.els.btnClear = this._buildBtnClear();
      }
      if (this._config.btnDeselectAll) {
        this.els.btnDeselectAll = this._buildBtnDeselectAll();
      }
      if (this._config.btnSelectAll) {
        this.els.btnSelectAll = this._buildBtnSelectAll();
      }
      this.els.controlSelected = this._buildShowSelected();
      this.els.dropdown = this._buildDropdown();
      this.els.dropdownMenu = this._buildDropdownMenu(); //This should be dropdown menu so we can build and refer to dropdown, the main container.
      this.els.dropdownItemsContainer = this._buildDropdownItemsContainer();
      this.els.dropdownItemNoResults = this._buildDropdownItemNoResults();
      this.els.dropdownItems = this._buildDropdownItems();
      this.els.dropdownOptions = this.els.dropdownItems.filter(function (index, element) {
        return _this._isOption($(element));
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
      key: 'toggle',


      // Public

      /**
       * Select/Deselect a dropdown item, and update the corresponding option.
       * @param  {object} $dropdownItem jQuery object
       * @return void
       */
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
        _._setButtonText();
        _._refreshInitialControls();
      }

      /**
       * Deselect a dropdown item.
       * @param  {object} $dropdownItem jQuery
       * @return void
       */

    }, {
      key: 'deselect',
      value: function deselect($dropdownItem) {
        var $el = $(this._element);
        var itemIndex = $dropdownItem.data('option');
        var $option = $el.find('option').eq(itemIndex);
        if ($option.is(':selected')) {
          this.toggle($dropdownItem);
        }
      }

      /**
       * Select a dropdown item.
       * @param  {object} $dropdownItem jQuery
       * @return void
       */

    }, {
      key: 'select',
      value: function select($dropdownItem) {
        var $el = $(this._element);
        var itemIndex = $dropdownItem.data('option');
        var $option = $el.find('option').eq(itemIndex);
        if (!$option.is(':selected')) {
          this.toggle($dropdownItem);
        }
      }

      /**
       * Deselect all dropdown items.
       * @return void
       */

    }, {
      key: 'deselectAll',
      value: function deselectAll() {
        var _this2 = this;

        var $el = $(this._element);
        this.els.dropdownOptions.each(function (index, element) {
          _this2.deselect($(element));
        });
        this._refresh();
      }

      /**
       * Select all dropdown items.
       * @return void
       */

    }, {
      key: 'selectAll',
      value: function selectAll() {
        var _this3 = this;

        var $el = $(this._element);
        this.els.dropdownOptions.each(function (index, element) {
          _this3.select($(element));
        });
        this._refresh();
      }

      // Private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = Object.assign({}, Default, config);
        _util2.default.typeCheckConfig(NAME, config, DefaultType);
        // Defaults: Enforce logic.
        if (!config.search) {
          config.btnClear = false;
        }
        if (!this._multiselect) {
          config.btnDeselectAll = false;
          config.btnSelectAll = false;
        }
        return config;
      }
    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        var _this4 = this;

        if (this._config.search) {
          this.els.controlSearch.on(Event.KEYUP, function (event) {
            return _this4._keyup(event);
          });
          this.els.controlSearch.on(Event.FOCUS, function (event) {
            return _this4._hoverSet();
          });
          this.els.controlSearch.on(Event.BLUR, function (event) {
            return _this4._hoverRemove();
          });
        }
        // Handle cut and paste.
        this.els.controlSearch.bind({
          paste: function paste() {
            $(this).trigger('keydown');
          },
          cut: function cut() {
            $(this).trigger('keydown');
          }
        });
        this._assignClickHandlers();
      }
    }, {
      key: '_keyup',
      value: function _keyup(event) {
        if (this._config.keyboard) {
          if (event.which == ENTER_KEYCODE) {
            this.toggle(this.els.dropdown.find('.hover').first());
            if (!this._multiselect) {
              this.els.btnSelect.dropdown('toggle');
            }
            return;
          } else if (event.which == ARROW_UP_KEYCODE) {
            if (!this._dropdownActive()) {
              this.els.btnSelect.dropdown('toggle');
              this.els.controlSearch.focus();
            }
            this._hoverUp();
            return;
          } else if (event.which == ARROW_DOWN_KEYCODE) {
            if (!this._dropdownActive()) {
              this.els.btnSelect.dropdown('toggle');
              this.els.controlSearch.focus();
            }
            this._hoverDown();
            return;
          }
        }
        this._search($(this.els.controlSearch).val());
      }
    }, {
      key: '_assignClickHandlers',
      value: function _assignClickHandlers() {
        var _this5 = this;

        // Select item.
        this.els.dropdownOptions.on('click', function (event) {
          event.preventDefault();
          if (_this5._multiselect) {
            _this5.els.dropdown.one('hide.bs.dropdown', function (event) {
              event.preventDefault();
            });
          }
          _this5.toggle($(event.currentTarget));
        });

        // Deselect all.
        if (this._config.btnDeselectAll) {
          this.els.btnDeselectAll.on('click', function (event) {
            event.preventDefault();
            _this5.els.dropdown.one('hide.bs.dropdown', function (event) {
              event.preventDefault();
            });
            if (!$(event.currentTarget).hasClass('disabled')) {
              _this5.deselectAll();
            }
          });
        }

        // Select all.
        if (this._config.btnSelectAll) {
          this.els.btnSelectAll.on('click', function (event) {
            event.preventDefault();
            _this5.els.dropdown.one('hide.bs.dropdown', function (event) {
              event.preventDefault();
            });
            if (!$(event.currentTarget).hasClass('disabled')) {
              _this5.selectAll();
            }
          });
        }

        // Clear search.
        if (this._config.btnClear) {
          this.els.btnClear.on('click', function () {
            _this5.els.controlSearch.val('');
            if (_this5._dropdownActive()) {
              _this5.els.dropdown.one('hide.bs.dropdown', function (event) {
                event.preventDefault();
              });
            }
            _this5._refresh();
          });
        }

        // Show selected.
        this.els.controlSelected.on('click', function (event) {
          event.preventDefault();
          _this5.els.dropdown.one('hide.bs.dropdown', function (event) {
            event.preventDefault();
          });
          if (!$(event.currentTarget).hasClass('disabled')) {
            _this5._sortSelected();
          }
        });

        // No results.
        this.els.dropdownItemNoResults.on('click', function (event) {
          event.preventDefault();
          _this5.els.dropdown.one('hide.bs.dropdown', function (event) {
            event.preventDefault();
          });
        });
      }
    }, {
      key: 'init',
      value: function init() {
        var _ = this; // Deep reference to this.
        var $el = $(_._element);

        // Build.
        _._setButtonText();
        this.els.dropdown.append(_.els.dropdownMenu);
        _.els.dropdownItemsContainer.append(_.els.dropdownItems);
        if (_._multiselect) {
          _.els.dropdownMenu.append(_.els.controlSelected);
        }
        _.els.dropdownMenu.append(_.els.dropdownItemsContainer);
        $el.after(this.els.dropdown);
        if (_._config.hideSelect) {
          $el.hide();
        }

        // On search focus: Toggle dropdown.
        // - Can reliance on setTimeout be removed?
        // - Should we depend on an aria attribute for plugin logic?
        if (_._config.search) {
          _.els.controlSearch.on('focusin', function () {
            if (_.els.btnSelect.attr('aria-expanded') == 'false') {
              _.els.btnSelect.dropdown('toggle');
              setTimeout(function () {
                _.els.controlSearch.focus();
              }, 1);
            }
          });
        }

        _._refreshInitialControls();

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
                  _._refresh();
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
        if ((typeof attrMultiple === 'undefined' ? 'undefined' : _typeof(attrMultiple)) !== ( true ? 'undefined' : undefined) && attrMultiple !== false) {
          return true;
        }
        return false;
      }

      /**
       * Search and take appropriate action.
       *
       * * If results haven't changed, do nothing (improves performance).
       * * If results have changed, hide non-matching options, reorder...etc.
       * @param  {[type]} s Search term
       * @return void
       */

    }, {
      key: '_search',
      value: function _search(s) {
        var results = null;
        if ($.trim(s) == '') {
          this._refresh();
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
          if (typeof this._lastSearch !== null && this._arraysEqual(results, this._lastSearch)) {
            this._resultsChanged = false;
          }
        } else {
          this._refresh();
          return;
        }
        if (this._resultsChanged) {
          this._hoverSet(results[0]);
          this._hide(results);
          this._reorder(results);
          this._resetScroll();
        }
        this._lastSearch = results;
      }
    }, {
      key: '_buildBtnSelect',
      value: function _buildBtnSelect() {
        var _ = this;
        return $('<button>', {
          class: _._config.classBtnSelect + ' dropdown-toggle',
          type: 'button',
          id: _.ids.dropdownButtonId,
          'data-toggle': 'dropdown',
          'data-target': '#' + _.ids.dropdownContainerId,
          'aria-haspopup': 'true',
          'aria-expanded': 'false'
        });
      }

      /**
       * Build HTML: Clear button
       * @return {object} jQuery
       */

    }, {
      key: '_buildBtnClear',
      value: function _buildBtnClear() {
        var _ = this;
        return $('<button>', {
          type: 'button',
          class: _._config.classBtnClear
        }).html(_._config.htmlBtnClear);
      }

      /**
       * Build HTML: Deselect all button
       * @return {object} jQuery
       */

    }, {
      key: '_buildBtnDeselectAll',
      value: function _buildBtnDeselectAll() {
        var _ = this;
        return $('<button>', {
          type: 'button',
          class: _._config.classBtnDeselectAll
        }).html(_._config.htmlBtnDeselectAll);
      }

      /**
       * Build HTML: Select all button
       * @return {object} jQuery
       */

    }, {
      key: '_buildBtnSelectAll',
      value: function _buildBtnSelectAll() {
        var _ = this;
        return $('<button>', {
          type: 'button',
          class: _._config.classBtnSelectAll
        }).html(_._config.htmlBtnSelectAll);
      }
    }, {
      key: '_buildShowSelected',
      value: function _buildShowSelected() {
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
      key: '_buildControlSearch',
      value: function _buildControlSearch() {
        return $('<input>', {
          type: 'text',
          class: 'form-control',
          placeholder: 'Search',
          'aria-label': 'Search',
          'aria-describedby': this.ids.controlSearchId
        });
      }
    }, {
      key: '_buildDropdown',
      value: function _buildDropdown() {
        var $dropdown = $('<div>', {
          id: this.ids.dropdownContainerId,
          class: ClassName.DROPDOWN
        });

        // Build dropdown.
        if (this._config.search) {
          var $inputGroup = $('<div>', {
            class: ClassName.INPUT_GROUP
          });

          $inputGroup.append(this.els.controlSearch);

          if (this._config.btnClear) {
            $inputGroup.append($('<div>', {
              class: ClassName.INPUT_GROUP_APPEND
            }).append(this.els.btnClear));
          }

          if (this._config.btnDeselectAll) {
            $inputGroup.append($('<div>', {
              class: ClassName.INPUT_GROUP_APPEND
            }).append(this.els.btnDeselectAll));
          }

          if (this._config.btnSelectAll) {
            $inputGroup.append($('<div>', {
              class: ClassName.INPUT_GROUP_APPEND
            }).append(this.els.btnSelectAll));
          }

          $inputGroup.append($('<div>', {
            class: ClassName.INPUT_GROUP_APPEND
          }).append(this.els.btnSelect));

          $dropdown.append($inputGroup);
        } else if (this._hasButtons) {
          var $btnGroup = $('<div>', {
            class: ClassName.BTN_GROUP
          });

          if (this._config.btnDeselectAll) {
            $btnGroup.append(this.els.btnDeselectAll);
          }

          if (this._config.btnSelectAll) {
            $btnGroup.append(this.els.btnSelectAll);
          }

          $btnGroup.append($('<div>', {
            class: ClassName.BTN_GROUP
          }).append(this.els.btnSelect));

          $dropdown.append($btnGroup);
        } else {
          $dropdown.append(this.els.btnSelect);
        }

        return $dropdown;
      }
    }, {
      key: '_buildDropdownMenu',
      value: function _buildDropdownMenu() {
        var _ = this;
        var $dropdownMenu = $('<div>', {
          class: ClassName.MENU + ' ' + ClassName.ALIGNMENT_RIGHT,
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
      key: '_buildDropdownItemsContainer',
      value: function _buildDropdownItemsContainer() {
        return $('<div>');
      }
    }, {
      key: '_buildDropdownItemNoResults',
      value: function _buildDropdownItemNoResults() {
        var _ = this;
        return $('<span>', {
          class: ClassName.ITEM + ' ' + 'text-muted no-results',
          text: _._config.textNoResults
        }).hide();
      }
    }, {
      key: '_buildDropdownItems',
      value: function _buildDropdownItems() {
        var _ = this;
        var $el = $(_._element);
        var s = 0; // Sort index
        var o = 0; // Option index
        var $items = $();
        var $optgroups = $el.find('optgroup');
        if ($optgroups.length) {
          $optgroups.each(function () {
            $items = $items.add(_._buildDropdownHeader($(this).attr('label')).data('index', s));
            s = _._incrementIndex(s);
            $(this).find('option').each(function () {
              $items = $items.add(_._buildDropdownItem($(this)).data('index', s).data('option', o));
              s = _._incrementIndex(s);
              o++;
            });
          });
        } else {
          $el.find('option').each(function (index, value) {
            $items = $items.add(_._buildDropdownItem($(this)).data('index', s).data('option', o));
            s = _._incrementIndex(s);
            o++;
          });
        }
        if (_._config.search) {
          $items = $items.add(_.els.dropdownItemNoResults);
        }
        return $items;
      }
    }, {
      key: '_incrementIndex',
      value: function _incrementIndex(index) {
        var _ = this;
        _._indexes.push(index.toString());
        index++;
        return index;
      }
    }, {
      key: '_buildDropdownHeader',
      value: function _buildDropdownHeader(text) {
        return $('<h6>', {
          class: 'dropdown-header',
          text: text
        });
      }
    }, {
      key: '_buildDropdownItem',
      value: function _buildDropdownItem($option) {
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

      /**
       * Boolean: Bootstrap Dropdown visible.
       * @return {boolean}
       */

    }, {
      key: '_dropdownActive',
      value: function _dropdownActive() {
        if (this.els.dropdownMenu.hasClass('show')) {
          return true;
        }
        return false;
      }

      /**
       * Boolean: Dropdown item is associated with a select option.
       *
       * e.g. Isn't an `<optgroup>` heading.
       * @param  {object}  $item jQuery object.
       * @return {Boolean}
       */

    }, {
      key: '_isOption',
      value: function _isOption($item) {
        var attr = $item.data('option');
        if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) !== ( true ? 'undefined' : undefined) && attr !== false) {
          return true;
        }
        return false;
      }

      /**
       * Set button text.
       * @return void
       */

    }, {
      key: '_setButtonText',
      value: function _setButtonText() {
        var _ = this;
        var $el = $(_._element);
        var $btn = _.els.btnSelect;
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
      key: '_refresh',
      value: function _refresh() {
        var _ = this;
        _._hoverRemove();
        _.els.dropdownItemNoResults.hide();
        _._sortReset();
        _._showInitialControls();
      }
    }, {
      key: '_hide',
      value: function _hide(results) {
        var _ = this;
        var notResults = $(_._indexes).not(results).get();
        $.each(notResults, function (index, value) {
          _._dropdownItemByIndex(value).hide();
        });
        _.els.btnSelect.dropdown('update');
      }
    }, {
      key: '_dropdownItemByIndex',
      value: function _dropdownItemByIndex(index) {
        var _ = this;
        return _.els.dropdownItems.filter(function () {
          return $(this).data('index') == index;
        });
      }
    }, {
      key: '_hideInitialControls',
      value: function _hideInitialControls() {
        var _ = this;
        _.els.controlSelected.hide();
      }
    }, {
      key: '_showInitialControls',
      value: function _showInitialControls(prepend) {
        prepend = (typeof prepend === 'undefined' ? 'undefined' : _typeof(prepend)) !== ( true ? 'undefined' : undefined) ? prepend : false;
        var _ = this;
        if (prepend) {
          _.els.controlSelected.prependTo(_.els.dropdownMenu);
        }
        _.els.controlSelected.show();
      }
    }, {
      key: '_refreshInitialControls',
      value: function _refreshInitialControls() {
        var _ = this;
        var $el = $(_._element);
        if (!$el.val() || $el.val().length == 0) {
          _.els.controlSelected.addClass('disabled');
        } else {
          _.els.controlSelected.removeClass('disabled');
        }
      }

      /**
       * Set hover class position.
       *
       * Move the hover class to a designated dropdown option. If the index points
       * to a non-option, the next option will be modified.
       * @param {integer} index Dropdown menu item index.
       */

    }, {
      key: '_hoverSet',
      value: function _hoverSet(index) {
        var _ = this;
        _.els.dropdownOptions.removeClass(ClassName.HOVER);
        if ((typeof index === 'undefined' ? 'undefined' : _typeof(index)) === ( true ? 'undefined' : undefined)) {
          var $item = _.els.dropdownOptions.first();
        } else {
          var $item = _._dropdownItemByIndex(index);
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
      key: '_hoverUp',
      value: function _hoverUp() {
        var _ = this;
        var current = _._hoverItem;
        if ((typeof current === 'undefined' ? 'undefined' : _typeof(current)) !== ( true ? 'undefined' : undefined) && current.length) {
          var prev = current.prevAll('a:visible').first();
        }
        if ((typeof prev === 'undefined' ? 'undefined' : _typeof(prev)) !== ( true ? 'undefined' : undefined) && prev.length) {
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
      key: '_hoverDown',
      value: function _hoverDown() {
        var _ = this;
        var current = _._hoverItem;
        if ((typeof current === 'undefined' ? 'undefined' : _typeof(current)) !== ( true ? 'undefined' : undefined) && current.length) {
          var next = current.nextAll('a:visible').first();
        }
        if ((typeof next === 'undefined' ? 'undefined' : _typeof(next)) !== ( true ? 'undefined' : undefined) && next.length) {
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
      key: '_hoverRemove',
      value: function _hoverRemove() {
        var _ = this;
        _.els.dropdownItems.removeClass(ClassName.HOVER).show();
      }

      /**
       * Sort: Reset sort order.
       * @return void
       */

    }, {
      key: '_sortReset',
      value: function _sortReset() {
        var _ = this;
        var i;
        for (i = _.els.dropdownItems.length; i >= 0; i--) {
          _._dropdownItemByIndex(i).prependTo(_.els.dropdownItemsContainer);
        }
      }

      /**
       * Sort: Order by array values.
       *
       * reorder according to an array of index values. The order of the index
       * array is preserved, to make change detection easier elsewhere.
       * @param  {array} indexes Array of index values (strings).
       * @return void
       */

    }, {
      key: '_reorder',
      value: function _reorder(indexes) {
        var _ = this;
        _.els.dropdownItemNoResults.hide();
        if ((typeof indexes === 'undefined' ? 'undefined' : _typeof(indexes)) === ( true ? 'undefined' : undefined) || indexes.length == 0) {
          _.els.dropdownItemNoResults.show();
          return;
        }
        var indexesReversed = indexes.slice(0); // Clone
        indexesReversed = indexesReversed.reverse();
        $.each(indexesReversed, function (index, value) {
          _._dropdownItemByIndex(value).prependTo(_.els.dropdownItemsContainer);
        });
        _._hideInitialControls();
      }

      /**
       * Sort: Move selected items to the top.
       * @return void
       */

    }, {
      key: '_sortSelected',
      value: function _sortSelected() {
        var _ = this;
        var $el = $(_._element);
        _.els.dropdownOptions.removeClass(ClassName.HOVER);
        $(_.els.dropdownMenu.find('.active').get().reverse()).each(function () {
          $(this).prependTo(_.els.dropdownItemsContainer);
        });
        _._showInitialControls(true);
        _.resetScroll();
      }

      /**
       * Helper: Reset scroll.
       *
       * Scroll the dropdown menu to the top.
       * @return {[type]} [description]
       */

    }, {
      key: '_resetScroll',
      value: function _resetScroll() {
        var _ = this;
        _.els.dropdownMenu.animate({
          scrollTop: 0
        }, 50);
      }

      /**
       * Helper: Compare two arrays.
       *
       * @see https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
       */

    }, {
      key: '_arraysEqual',
      value: function _arraysEqual(a, b) {
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);
__webpack_require__(3);

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);