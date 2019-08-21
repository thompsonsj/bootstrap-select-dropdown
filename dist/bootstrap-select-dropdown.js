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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "$"
var external_$_ = __webpack_require__(0);
var external_$_default = /*#__PURE__*/__webpack_require__.n(external_$_);

// CONCATENATED MODULE: ./node_modules/bootstrap/js/src/util.js
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */



/**
 * ------------------------------------------------------------------------
 * Private TransitionEnd Helpers
 * ------------------------------------------------------------------------
 */

const TRANSITION_END = 'transitionend'
const MAX_UID = 1000000
const MILLISECONDS_MULTIPLIER = 1000

// Shoutout AngusCroll (https://goo.gl/pxwQGp)
function toType(obj) {
  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
}

function getSpecialTransitionEndEvent() {
  return {
    bindType: TRANSITION_END,
    delegateType: TRANSITION_END,
    handle(event) {
      if (external_$_default()(event.target).is(this)) {
        return event.handleObj.handler.apply(this, arguments) // eslint-disable-line prefer-rest-params
      }
      return undefined // eslint-disable-line no-undefined
    }
  }
}

function transitionEndEmulator(duration) {
  let called = false

  external_$_default()(this).one(Util.TRANSITION_END, () => {
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
  external_$_default.a.fn.emulateTransitionEnd = transitionEndEmulator
  external_$_default.a.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent()
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
      const hrefAttr = element.getAttribute('href')
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : ''
    }

    try {
      return document.querySelector(selector) ? selector : null
    } catch (err) {
      return null
    }
  },

  getTransitionDurationFromElement(element) {
    if (!element) {
      return 0
    }

    // Get transition-duration of the element
    let transitionDuration = external_$_default()(element).css('transition-duration')
    let transitionDelay = external_$_default()(element).css('transition-delay')

    const floatTransitionDuration = parseFloat(transitionDuration)
    const floatTransitionDelay = parseFloat(transitionDelay)

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0]
    transitionDelay = transitionDelay.split(',')[0]

    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
  },

  reflow(element) {
    return element.offsetHeight
  },

  triggerTransitionEnd(element) {
    external_$_default()(element).trigger(TRANSITION_END)
  },

  // TODO: Remove in v5
  supportsTransitionEnd() {
    return Boolean(TRANSITION_END)
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
  },

  findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null
    }

    // Can find the shadow root otherwise it'll return the document
    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode()
      return root instanceof ShadowRoot ? root : null
    }

    if (element instanceof ShadowRoot) {
      return element
    }

    // when we don't find a shadow root
    if (!element.parentNode) {
      return null
    }

    return Util.findShadowRoot(element.parentNode)
  }
}

setTransitionEndSupport()

/* harmony default export */ var util = (Util);

// EXTERNAL MODULE: external "Fuse"
var external_Fuse_ = __webpack_require__(1);
var external_Fuse_default = /*#__PURE__*/__webpack_require__.n(external_Fuse_);

// CONCATENATED MODULE: ./src/js/bootstrap-select-dropdown.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var SelectDropdownIndex = 1;
/**
 * --------------------------------------------------------------------------
 * Bootstrap Select Dropdown
 * --------------------------------------------------------------------------
 */

var bootstrap_select_dropdown_SelectDropdown = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'selectDropdown';
  var VERSION = '0.14.1';
  var DATA_KEY = 'bs.selectDropdown';
  var EVENT_KEY = ".".concat(DATA_KEY);
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var KEYUP_TIMEOUT = 300;
  var ENTER_KEYCODE = 13;
  var ESCAPE_KEYCODE = 27;
  var ARROW_UP_KEYCODE = 38;
  var ARROW_DOWN_KEYCODE = 40;
  var Default = {
    // Profile
    profile: "default",
    // Behaviour
    hideSelect: true,
    search: true,
    observeDomMutations: false,
    maxHeight: '300px',
    keyboard: true,
    badges: true,
    // Multiselect only
    badgesDismissable: true,
    // Multiselect only
    maxListLength: 0,
    // Multiselect only
    // Text
    textNoneSelected: "Select",
    textMultipleSelected: "%count_selected% selected",
    textNoResults: "No results",
    // Controls
    deselectAll: true,
    // Multiselect only
    selectAll: true,
    // Multiselect only
    showSelected: true,
    // Multiselect only
    // Buttons
    selectButtons: false,
    classBtnDeselectAll: "btn btn-outline-secondary",
    // Multiselect only
    classBtnSelectAll: "btn btn-outline-secondary",
    // Multiselect only
    // HTML
    htmlClear: "Clear search",
    htmlDeselectAll: "Deselect all",
    // Multiselect only
    htmlSelectAll: "Select all",
    // Multiselect only
    htmlBadgeRemove: "[X]",
    // Badges only
    // Classes
    classBtnSelect: "btn btn-primary",
    classBadge: "badge badge-dark mr-1 mb-1",
    classBadgeLink: "text-white",
    classBadgeContainer: "mt-2 mb-3",
    // Callbacks
    loaded: function loaded() {}
  };
  var DefaultType = {
    maxListLength: 'number',
    hideSelect: 'boolean',
    search: 'boolean',
    observeDomMutations: 'boolean',
    maxHeight: 'string',
    keyboard: 'boolean',
    badges: 'boolean',
    badgesDismissable: 'boolean',
    textNoneSelected: 'string',
    textMultipleSelected: 'string',
    textNoResults: 'string',
    deselectAll: 'boolean',
    selectAll: 'boolean',
    selectButtons: 'boolean',
    classBtnDeselectAll: 'string',
    classBtnSelectAll: 'string',
    htmlClear: 'string',
    htmlDeselectAll: 'string',
    htmlSelectAll: 'string',
    htmlBadgeRemove: 'string',
    classBtnSelect: 'string',
    classBadge: 'string',
    classBadgeLink: 'string',
    classBadgeContainer: 'string',
    loaded: 'function'
  };
  var Event = {
    CLICK: "click".concat(EVENT_KEY),
    KEYUP: "keyup".concat(EVENT_KEY),
    KEYDOWN: "keydown".concat(EVENT_KEY),
    FOCUS: "focus".concat(EVENT_KEY),
    BLUR: "blur".concat(EVENT_KEY),
    FOCUSIN: "focusin".concat(EVENT_KEY),
    LOAD_DATA_API: "load".concat(EVENT_KEY).concat(DATA_API_KEY)
  };
  var ClassName = {
    ACTIVE: 'active',
    BG_TRANSPARENT: 'bg-transparent',
    DISABLED: 'disabled',
    DROPDOWN: 'dropdown',
    MENU: 'dropdown-menu',
    ITEM: 'dropdown-item',
    BTN_GROUP: 'btn-group',
    INPUT_GROUP: 'input-group',
    INPUT_GROUP_APPEND: 'input-group-append',
    HOVER: 'hover',
    HOVER_BG: 'bg-light',
    TEXT_MUTED: 'text-muted',
    ALIGNMENT_RIGHT: 'dropdown-menu-right'
  };
  var Selector = {
    DATA_ROLE: '[data-role="select-dropdown"]'
  };
  var Keyword = {
    COUNT_SELECTED: '%count_selected%'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var SelectDropdown =
  /*#__PURE__*/
  function () {
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
      this._keyupTimeout = null;
      this.ids = {};
      this.ids.dropdownContainerId = this._prefix + 'container';
      this.ids.dropdownButtonId = this._prefix + 'button';
      this.ids.controlSearchId = this._prefix + 'search';
      this.ids.dropdownItemDeselect = this._prefix + 'deselect';
      this.ids.dropdownItemShowSelected = this._prefix + 'selected'; // Selectors.

      this.selectors = {};

      if (this._config.badges) {
        this.selectors.badge = this._classListToSelector(this._config.classBadge);
      } // Properties: Elements.


      this.els = {};
      this.els.btnSelect = this._buildBtnSelect();

      if (this._config.search) {
        this.els.controlSearch = this._buildControlSearch();
        this.els.clear = this._buildControlClear();
      }

      if (this._config.deselectAll) {
        this.els.deselectAll = this._buildDeselectAll();
      }

      if (this._config.selectAll) {
        this.els.selectAll = this._buildSelectAll();
      }

      this.els.showSelected = this._buildShowSelected();
      this.els.dropdown = this._buildDropdown();
      this.els.dropdownMenu = this._buildDropdownMenu(); //This should be dropdown menu so we can build and refer to dropdown, the main container.

      this.els.dropdownItemsContainer = this._buildDropdownItemsContainer();
      this.els.dropdownItemNoResults = this._buildDropdownItemNoResults();
      this.els.dropdownItems = this._buildDropdownItems();
      this.els.dropdownOptions = this.els.dropdownItems.filter(function (index, element) {
        return _this._isOption($(element));
      });

      if (this._config.badges) {
        this.els.badgeContainer = this._buildBadgeContainer();
      }

      if (this._config.search) {
        this._hideClear();

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
    } // Getters


    _createClass(SelectDropdown, [{
      key: "toggle",
      // Public

      /**
       * Select/Deselect a dropdown item, and update the corresponding option.
       * @param  {object} $dropdownItem jQuery object
       * @return {undefined}
       */
      value: function toggle($dropdownItem) {
        var _ = this;

        var $el = $(_._element);
        var itemIndex = $dropdownItem.data('option');
        var $option = $el.find('option').eq(itemIndex);

        if ($option.is(':selected')) {
          $option.prop('selected', false);
          $dropdownItem.removeClass(ClassName.ACTIVE);
        } else {
          if (!_._multiselect) {
            _.els.dropdownOptions.removeClass(ClassName.ACTIVE);
          }

          $option.prop('selected', true);
          $dropdownItem.removeClass(ClassName.HOVER_BG).addClass(ClassName.ACTIVE);
        }

        _._externalFeedback();
      }
      /**
       * Deselect a dropdown item.
       * @param  {object} $dropdownItem jQuery
       * @return {undefined}
       */

    }, {
      key: "deselect",
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
       * @return {undefined}
       */

    }, {
      key: "select",
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
       * @return {undefined}
       */

    }, {
      key: "deselectAll",
      value: function deselectAll() {
        var $el = $(this._element);
        $el.find('option').prop('selected', false);
        this.els.dropdownOptions.removeClass(ClassName.ACTIVE);

        this._externalFeedback();

        this._refresh();
      }
      /**
       * Select all dropdown items.
       * @return {undefined}
       */

    }, {
      key: "selectAll",
      value: function selectAll() {
        var $el = $(this._element);
        $el.find('option').prop('selected', true);
        this.els.dropdownOptions.removeClass(ClassName.HOVER_BG).addClass(ClassName.ACTIVE);

        this._externalFeedback();

        this._refresh();
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        if (config.profile == 'minimal') {
          if (_typeof(config.search) !== ( true ? "undefined" : undefined)) {
            config.search = false;
          }

          if (_typeof(config.badges) !== ( true ? "undefined" : undefined)) {
            config.badges = false;
          }

          if (_typeof(config.deselectAll) !== ( true ? "undefined" : undefined)) {
            config.deselectAll = false;
          }

          if (_typeof(config.selectAll) !== ( true ? "undefined" : undefined)) {
            config.selectAll = false;
          }

          if (_typeof(config.showSelected) !== ( true ? "undefined" : undefined)) {
            config.showSelected = false;
          }
        }

        config = _objectSpread({}, Default, {}, config);
        util.typeCheckConfig(NAME, config, DefaultType);

        if (!this._multiselect) {
          config.deselectAll = false;
          config.selectAll = false;
          config.showSelected = false;
          config.badges = false;
        }

        return config;
      }
    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this2 = this;

        if (this._config.search) {
          this.els.controlSearch.on(Event.KEYUP, function (event) {
            if (_this2._config.keyboard) {
              _this2._keyupNav(event);
            }

            clearTimeout(_this2._keyupTimeout);
            _this2._keyupTimeout = setTimeout(function () {
              var s = $(_this2.els.controlSearch).val();

              _this2._search(s);
            }, KEYUP_TIMEOUT);
          });
          this.els.controlSearch.on(Event.FOCUS, function (event) {
            _this2._hoverSet();

            if (_this2.els.btnSelect.attr('aria-expanded') == 'false') {
              _this2._alignLeft();

              _this2.els.btnSelect.dropdown('toggle');

              setTimeout(function () {
                _this2._searchControlFocus();
              }, 1);
            }
          });
          this.els.controlSearch.on(Event.BLUR, function (event) {
            _this2._hoverRemoveAll();

            _this2._alignRight();
          }); // Handle cut and paste.

          this.els.controlSearch.bind({
            paste: function paste() {
              $(this).trigger(Event.KEYDOWN);
            },
            cut: function cut() {
              $(this).trigger(Event.KEYDOWN);
            }
          });
        }

        this._assignClickHandlers();
      }
    }, {
      key: "_keyupNav",
      value: function _keyupNav(event) {
        if (event.which == ENTER_KEYCODE) {
          this.toggle(this.els.dropdown.find('.hover').first());

          if (!this._multiselect) {
            this.els.btnSelect.dropdown('toggle');
          }

          return;
        } else if (event.which == ARROW_UP_KEYCODE) {
          this._hoverUp();
        } else if (event.which == ARROW_DOWN_KEYCODE) {
          this._hoverDown();
        }

        if (!this._dropdownActive()) {
          this.els.btnSelect.dropdown('toggle');

          this._searchControlFocus();
        }
      }
    }, {
      key: "_assignClickHandlers",
      value: function _assignClickHandlers() {
        var _this3 = this;

        // Select item.
        this.els.dropdownOptions.on(Event.CLICK, function (event) {
          event.preventDefault();

          if (_this3._multiselect) {
            _this3._preventDropdownHide();
          }

          _this3.toggle($(event.currentTarget));
        }); // Deselect all.

        if (this._config.deselectAll) {
          this.els.deselectAll.on(Event.CLICK, function (event) {
            event.preventDefault();

            _this3._preventDropdownHide();

            if (!$(event.currentTarget).hasClass('disabled')) {
              _this3.deselectAll();
            }
          });
        } // Select all.


        if (this._config.selectAll) {
          this.els.selectAll.on(Event.CLICK, function (event) {
            event.preventDefault();

            _this3._preventDropdownHide();

            if (!$(event.currentTarget).hasClass('disabled')) {
              _this3.selectAll();
            }
          });
        } // Clear search.


        if (this._config.search) {
          this.els.clear.on(Event.CLICK, function (event) {
            event.preventDefault();

            _this3.els.controlSearch.val('');

            _this3._preventDropdownHide();

            _this3._refresh();

            _this3._searchControlFocus();
          });
        } // Show selected.


        this.els.showSelected.on(Event.CLICK, function (event) {
          event.preventDefault();

          _this3._preventDropdownHide();

          if (!$(event.currentTarget).hasClass('disabled')) {
            _this3._toggleShowSelected();
          }
        }); // No results.

        this.els.dropdownItemNoResults.on(Event.CLICK, function (event) {
          event.preventDefault();

          _this3._preventDropdownHide();
        }); // Badges.

        if (this._config.badges) {
          this.els.badgeContainer.on(Event.CLICK, 'a', function (event) {
            event.preventDefault();
            var $target = $(event.currentTarget);

            _this3.deselect(_this3._dropdownItemByOption($target.data('option')));

            $target.parent(_this3.selectors.badge).remove();
          });
        }
      }
    }, {
      key: "init",
      value: function init() {
        // Build.
        this._externalFeedback(); // Dropdown menu.


        if (this._config.search) {
          this.els.dropdownMenu.append(this.els.clear);
        }

        if (this._config.selectAll && !this._config.selectButtons) {
          this.els.dropdownMenu.append(this.els.selectAll);
        }

        if (this._config.deselectAll && !this._config.selectButtons) {
          this.els.dropdownMenu.append(this.els.deselectAll);
        }

        if (this._config.showSelected) {
          this.els.dropdownMenu.append(this.els.showSelected);
        } // Dropdown items.


        this.els.dropdownItemsContainer.append(this.els.dropdownItems);
        this.els.dropdownMenu.append(this.els.dropdownItemsContainer); // Dropdown.

        this.els.dropdown.append(this.els.dropdownMenu); // Replace <select>.

        var $el = $(this._element);
        $el.after(this.els.dropdown);

        if (this._config.hideSelect) {
          $el.hide();
        }

        if (this._config.badges) {
          this.els.dropdown.after(this.els.badgeContainer);
        } // DOM mutation observer

        /*if ( _._config.observeDomMutations ) {
          var config = { childList: true, subtree: true };
          var callback = function( mutationsList ) {
            for( var mutation of mutationsList ) {
              if ( mutation.type == 'childList') {
                _._refresh();
              }
            }
          };
          var observer = new MutationObserver( callback );
          observer.observe( $el[0], config );
        }*/

      }
      /**
       * Check whether the supplied element has a `multiple` attribute,
       * @param  {Object}  element
       * @return {Boolean}
       */

    }, {
      key: "_isMultiselect",
      value: function _isMultiselect(element) {
        var attrMultiple = $(element).attr('multiple');

        if (_typeof(attrMultiple) !== ( true ? "undefined" : undefined) && attrMultiple !== false) {
          return true;
        }

        return false;
      }
      /**
       * Search and take appropriate action.
       *
       * * If results haven't changed, do nothing (improves performance).
       * * If results have changed, apply changes.
       * @param  {String} s Search term
       * @return {undefined}
       */

    }, {
      key: "_search",
      value: function _search(s) {
        var results = null;

        if ($.trim(s) == '') {
          this._refresh();

          if (this._lastSearch !== null) {
            this._resultsChanged = true;
            this._lastSearch = null;

            this._hoverSet();
          }

          return;
        } else {
          var fuse = new external_Fuse_default.a(this._haystack, this._fuseOptions);
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
          this._applySearch(results);
        }

        this._lastSearch = results;
      }
      /**
       * Apply changes as per search results.
       *
       * * Remove showSelected active class if present.
       * * Show clear control.
       * * Set hover on the first element for keyboard navigation.
       * * Hide non-results.
       * * Reorder search results.
       * * Reset scroll (scroll to top).
       * @param  {array} results Option index numbers.
       * @return {undefined}
       */

    }, {
      key: "_applySearch",
      value: function _applySearch(results) {
        this._softDisableShowSelected();

        this._showClear();

        this._hoverSet(results[0]);

        this._hide(results);

        this._reorder(results);

        this._resetScroll();
      }
    }, {
      key: "_buildBtnSelect",
      value: function _buildBtnSelect() {
        var _ = this;

        return $('<button>', {
          "class": _._config.classBtnSelect + ' dropdown-toggle',
          type: 'button',
          id: _.ids.dropdownButtonId,
          'data-toggle': 'dropdown',
          'data-target': '#' + _.ids.dropdownContainerId,
          'aria-haspopup': 'true',
          'aria-expanded': 'false'
        }).text('Select');
      }
      /**
       * Build HTML: Clear control
       * @return {object} jQuery
       */

    }, {
      key: "_buildControlClear",
      value: function _buildControlClear() {
        return $('<a>', {
          href: '#',
          "class": ClassName.ITEM
        }).html(this._config.htmlClear);
      }
      /**
       * Build HTML: Deselect all element
       * @return {object} jQuery
       */

    }, {
      key: "_buildDeselectAll",
      value: function _buildDeselectAll() {
        var element;

        if (!this._config.selectButtons) {
          element = $('<a>', {
            href: '#',
            "class": ClassName.ITEM
          });
        } else {
          element = $('<button>', {
            type: 'button',
            "class": this._config.classBtnDeselectAll
          });
        }

        return element.html(this._config.htmlDeselectAll).attr('title', 'Deselect all');
      }
      /**
       * Build HTML: Select all element
       * @return {object} jQuery
       */

    }, {
      key: "_buildSelectAll",
      value: function _buildSelectAll() {
        var element;

        if (!this._config.selectButtons) {
          element = $('<a>', {
            href: '#',
            "class": ClassName.ITEM
          });
        } else {
          element = $('<button>', {
            type: 'button',
            "class": this._config.classBtnSelectAll
          });
        }

        return element.html(this._config.htmlSelectAll).attr('title', 'Select all');
      }
    }, {
      key: "_buildShowSelected",
      value: function _buildShowSelected() {
        var _ = this;

        var $showSelectedItem = $('<a>', {
          href: '#',
          "class": ClassName.ITEM,
          text: 'Show selected'
        });
        return $showSelectedItem;
      }
    }, {
      key: "_buildControlSearch",
      value: function _buildControlSearch() {
        return $('<input>', {
          type: 'text',
          "class": 'form-control',
          placeholder: 'Search',
          'aria-label': 'Search',
          'aria-describedby': this.ids.controlSearchId
        });
      }
    }, {
      key: "_buildDropdown",
      value: function _buildDropdown() {
        var $dropdown = $('<div>', {
          id: this.ids.dropdownContainerId,
          "class": ClassName.DROPDOWN
        }); // Build dropdown.

        if (this._config.search) {
          var $inputGroup = $('<div>', {
            "class": ClassName.INPUT_GROUP
          });
          $inputGroup.append(this.els.controlSearch);

          if (this._config.selectButtons) {
            if (this._config.deselectAll) {
              $inputGroup.append($('<div>', {
                "class": ClassName.INPUT_GROUP_APPEND
              }).append(this.els.deselectAll));
            }

            if (this._config.selectAll) {
              $inputGroup.append($('<div>', {
                "class": ClassName.INPUT_GROUP_APPEND
              }).append(this.els.selectAll));
            }
          }

          $inputGroup.append($('<div>', {
            "class": ClassName.INPUT_GROUP_APPEND
          }).append(this.els.btnSelect));
          $dropdown.append($inputGroup);
        } else if (this._config.selectButtons) {
          var $btnGroup = $('<div>', {
            "class": ClassName.BTN_GROUP
          });

          if (this._config.deselectAll) {
            $btnGroup.append(this.els.deselectAll);
          }

          if (this._config.selectAll) {
            $btnGroup.append(this.els.selectAll);
          }

          $btnGroup.append($('<div>', {
            "class": ClassName.BTN_GROUP
          }).append(this.els.btnSelect));
          $dropdown.append($btnGroup);
        } else {
          $dropdown.append(this.els.btnSelect);
        }

        return $dropdown;
      }
    }, {
      key: "_buildDropdownMenu",
      value: function _buildDropdownMenu() {
        var $dropdownMenu = $('<div>', {
          "class": ClassName.MENU,
          'aria-labelledby': this.ids.dropdownButtonId
        });

        if (this._config.maxHeight) {
          $dropdownMenu.css({
            'height': 'auto',
            'max-height': this._config.maxHeight,
            'overflow-x': 'hidden'
          });
        }

        if (this._config.search) {
          $dropdownMenu.addClass(ClassName.ALIGNMENT_RIGHT);
        }

        return $dropdownMenu;
      }
    }, {
      key: "_buildDropdownItemsContainer",
      value: function _buildDropdownItemsContainer() {
        return $('<div>');
      }
    }, {
      key: "_buildDropdownItemNoResults",
      value: function _buildDropdownItemNoResults() {
        var _ = this;

        return $('<span>', {
          "class": ClassName.ITEM + ' ' + ClassName.TEXT_MUTED + ' ' + ClassName.BG_TRANSPARENT,
          text: _._config.textNoResults
        }).hide();
      }
    }, {
      key: "_buildDropdownItems",
      value: function _buildDropdownItems() {
        var _this4 = this;

        var s = 0; // Sort index

        var o = 0; // Option index

        var $items = $();
        var $optgroups = $(this._element).find('optgroup');

        if ($optgroups.length) {
          $optgroups.each(function (index, element) {
            $items = $items.add(_this4._buildDropdownHeader($(element).attr('label')).data('index', s));
            s = _this4._incrementIndex(s);
            $(element).find('option').each(function (index, element) {
              $(element).data('option', o);
              $items = $items.add(_this4._buildDropdownItem($(element)).data('index', s).data('option', o));
              s = _this4._incrementIndex(s);
              o++;
            });
          });
        } else {
          $(this._element).find('option').each(function (index, element) {
            $(element).data('option', o);
            $items = $items.add(_this4._buildDropdownItem($(element)).data('index', s).data('option', o));
            s = _this4._incrementIndex(s);
            o++;
          });
        }

        if (this._config.search) {
          $items = $items.add(this.els.dropdownItemNoResults);
        }

        return $items;
      }
    }, {
      key: "_incrementIndex",
      value: function _incrementIndex(index) {
        var _ = this;

        _._indexes.push(index.toString());

        index++;
        return index;
      }
    }, {
      key: "_buildDropdownHeader",
      value: function _buildDropdownHeader(text) {
        return $('<h6>', {
          "class": 'dropdown-header',
          text: text
        });
      }
    }, {
      key: "_buildDropdownItem",
      value: function _buildDropdownItem($option) {
        var _ = this;

        var $dropdownItem = $('<a>', {
          href: '#',
          "class": ClassName.ITEM,
          text: $option.text()
        });

        if ($option.is(':selected')) {
          $dropdownItem.addClass('active');
        }

        return $dropdownItem;
      }
    }, {
      key: "_buildBadgeContainer",
      value: function _buildBadgeContainer() {
        return $('<div>', {
          'class': this._config.classBadgeContainer
        });
      }
      /**
       * Build badge.
       * @param  {Integer} option Option index number
       * @param  {String} text
       * @return {Object} jQuery object
       */

    }, {
      key: "_buildBadge",
      value: function _buildBadge(option, text) {
        var badge = $('<span>', {
          'class': this._config.classBadge
        }).text(text);

        if (this._config.badgesDismissable) {
          badge.append(' ').append($('<a>', {
            'href': '#',
            'class': this._config.classBadgeLink
          }).html(this._config.htmlBadgeRemove).data('option', option));
        }

        return badge;
      }
      /**
       * Boolean: Bootstrap Dropdown visible.
       * @return {boolean}
       */

    }, {
      key: "_dropdownActive",
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
      key: "_isOption",
      value: function _isOption($item) {
        var attr = $item.data('option');

        if (_typeof(attr) !== ( true ? "undefined" : undefined) && attr !== false) {
          return true;
        }

        return false;
      }
    }, {
      key: "_externalFeedback",
      value: function _externalFeedback() {
        this._setButtonText();

        if (this._config.badges) {
          this._setBadges();
        }
      }
      /**
       * Set button text.
       * @return {undefined}
       */

    }, {
      key: "_setButtonText",
      value: function _setButtonText() {
        var btnText;
        var selected = $(this._element).val();
        var noneSelected = false;
        var allSelected = false;

        if (!this._multiselect && selected.length > 0) {
          btnText = $(this._element).find('option:selected').text();
        } else if (selected.length < 1) {
          btnText = this._config.textNoneSelected;
          noneSelected = true;
        } else if (selected.length <= this._config.maxListLength) {
          btnText = this._getTextValues().join(", ");
        } else {
          btnText = this._config.textMultipleSelected;
          btnText = btnText.replace(Keyword.COUNT_SELECTED, selected.length);
        }

        if (selected.length == this.els.dropdownOptions.length) {
          allSelected = true;
        }

        this._refreshInitialControls(allSelected, noneSelected);

        this.els.btnSelect.text(btnText);
      }
    }, {
      key: "_setBadges",
      value: function _setBadges(selected) {
        var _this5 = this;

        var badges = $();
        var $selected = $(this._element).find('option:selected');
        $selected.each(function (index, element) {
          badges = badges.add(_this5._buildBadge($(element).data('option'), $(element).text()));
        });
        this.els.badgeContainer.html('').append(badges);
      }
    }, {
      key: "_getText",
      value: function _getText(value) {
        return $(this._element).find("option[value='" + value + "']").first().text();
      }
    }, {
      key: "_getTextValues",
      value: function _getTextValues() {
        return $(this._element).find('option:selected').map(function (i, element) {
          return $(element).text();
        }).get();
      }
      /**
       * Restore initial dropdown state.
       *
       * * Remove hover.
       * * Hide the 'no results' dropdown item.
       * * Reset sort order.
       * * Show initial controls.
       * @return {undefined}
       */

    }, {
      key: "_refresh",
      value: function _refresh() {
        this._hideClear();

        this.els.dropdownItemNoResults.hide();
        this.els.dropdownOptions.show();

        this._sortReset();

        this._showInitialControls();
      }
    }, {
      key: "_hide",
      value: function _hide(results) {
        var _this6 = this;

        var notResults = $(this._indexes).not(results).get();
        $.each(notResults, function (index, value) {
          _this6._dropdownItemByIndex(value).hide();
        });
        $.each(results, function (index, value) {
          _this6._dropdownItemByIndex(value).show();
        });
        this.els.btnSelect.dropdown('update');
      }
    }, {
      key: "_dropdownItemByIndex",
      value: function _dropdownItemByIndex(s) {
        return this.els.dropdownItems.filter(function (index, element) {
          return $(element).data('index') == s;
        });
      }
    }, {
      key: "_dropdownItemByOption",
      value: function _dropdownItemByOption(o) {
        return this.els.dropdownItems.filter(function (index, element) {
          return $(element).data('option') == o;
        });
      }
    }, {
      key: "_hideInitialControls",
      value: function _hideInitialControls() {
        if (this._config.selectAll && !this._config.selectButtons) {
          this.els.selectAll.hide();
        }

        if (this._config.deselectAll && !this._config.selectButtons) {
          this.els.deselectAll.hide();
        }

        if (this._config.showSelected) {
          this.els.showSelected.hide();
        }
      }
    }, {
      key: "_showInitialControls",
      value: function _showInitialControls() {
        if (this._config.selectAll && !this._config.selectButtons) {
          this.els.selectAll.show();
        }

        if (this._config.deselectAll && !this._config.selectButtons) {
          this.els.deselectAll.show();
        }

        if (this._config.showSelected) {
          this.els.showSelected.show();
        }
      }
    }, {
      key: "_refreshInitialControls",
      value: function _refreshInitialControls(allSelected, noneSelected) {
        if (this._config.selectAll) {
          this._disableEnable(this.els.selectAll, allSelected);
        }

        if (this._config.deselectAll) {
          this._disableEnable(this.els.deselectAll, noneSelected);
        }

        if (this._config.showSelected) {
          this._disableEnable(this.els.showSelected, noneSelected || allSelected);
        }
      }
    }, {
      key: "_showClear",
      value: function _showClear() {
        if (this._config.search) {
          this.els.clear.show();
        }
      }
    }, {
      key: "_hideClear",
      value: function _hideClear() {
        if (this._config.search) {
          this.els.clear.hide();
        }
      }
    }, {
      key: "_disableEnable",
      value: function _disableEnable($element, condition) {
        if (condition) {
          this._disable($element);
        } else {
          this._enable($element);
        }
      }
    }, {
      key: "_enable",
      value: function _enable($element) {
        if ($element.is('button')) {
          $element.prop('disabled', false);
        }

        $element.removeClass(ClassName.DISABLED);

        if ($element.is('a')) {
          $element.removeClass(ClassName.TEXT_MUTED);
        }
      }
    }, {
      key: "_disable",
      value: function _disable($element) {
        if ($element.is('button')) {
          $element.prop('disabled', true);
        }

        $element.addClass(ClassName.DISABLED);

        if ($element.is('a')) {
          $element.addClass(ClassName.TEXT_MUTED);
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
      key: "_hoverSet",
      value: function _hoverSet(index) {
        var _ = this;

        this._hoverRemoveAll();

        if (_typeof(index) === ( true ? "undefined" : undefined)) {
          var $item = _.els.dropdownOptions.first();
        } else {
          var $item = _._dropdownItemByIndex(index);
        }

        _._hoverItem = $item;

        this._hoverAdd($item);
      }
      /**
       * Move the hover class up.
       *
       * @return {undefined}
       */

    }, {
      key: "_hoverUp",
      value: function _hoverUp() {
        var _ = this;

        var current = _._hoverItem;

        if (_typeof(current) !== ( true ? "undefined" : undefined) && current.length) {
          var prev = current.prevAll('a:visible').first();
        }

        if (_typeof(prev) !== ( true ? "undefined" : undefined) && prev.length) {
          this._hoverRemove(current);

          this._hoverAdd(prev);

          _._hoverItem = prev;
        }
      }
      /**
       * Move the hover class down.
       *
       * @return {undefined}
       */

    }, {
      key: "_hoverDown",
      value: function _hoverDown() {
        var _ = this;

        var current = _._hoverItem;

        if (_typeof(current) !== ( true ? "undefined" : undefined) && current.length) {
          var next = current.nextAll('a:visible').first();
        }

        if (_typeof(next) !== ( true ? "undefined" : undefined) && next.length) {
          this._hoverRemove(current);

          this._hoverAdd(next);

          _._hoverItem = next;
        }
      }
    }, {
      key: "_hoverAdd",
      value: function _hoverAdd($element) {
        var className = ClassName.HOVER;

        if (!$element.hasClass(ClassName.ACTIVE)) {
          className = className + ' ' + ClassName.HOVER_BG;
        }

        $element.addClass(className);
      }
    }, {
      key: "_hoverRemove",
      value: function _hoverRemove($element) {
        $element.removeClass(ClassName.HOVER + ' ' + ClassName.HOVER_BG);
      }
      /**
       * Remove hover class from all dropdown options.
       * @return {undefined}
       */

    }, {
      key: "_hoverRemoveAll",
      value: function _hoverRemoveAll() {
        this.els.dropdownOptions.removeClass(ClassName.HOVER + ' ' + ClassName.HOVER_BG);
      }
      /**
       * Sort: Reset sort order.
       * @return {undefined}
       */

    }, {
      key: "_sortReset",
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
       * @return {undefined}
       */

    }, {
      key: "_reorder",
      value: function _reorder(indexes) {
        var _ = this;

        _.els.dropdownItemNoResults.hide();

        if (_typeof(indexes) === ( true ? "undefined" : undefined) || indexes.length == 0) {
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
       * @return {undefined}
       */

    }, {
      key: "_toggleShowSelected",
      value: function _toggleShowSelected() {
        if (this.els.showSelected.hasClass(ClassName.ACTIVE)) {
          this.disableShowSelected();
        } else {
          this._enableShowSelected();
        }
      }
    }, {
      key: "_enableShowSelected",
      value: function _enableShowSelected() {
        var _this7 = this;

        this.els.showSelected.addClass(ClassName.ACTIVE);
        $(this.els.dropdownItemsContainer.find('.active').get().reverse()).each(function (index, element) {
          $(element).prependTo(_this7.els.dropdownItemsContainer);
        });

        this._resetScroll();
      }
    }, {
      key: "_disableShowSelected",
      value: function _disableShowSelected() {
        this._softDisableShowSelected();

        this._sortReset();
      }
    }, {
      key: "_softDisableShowSelected",
      value: function _softDisableShowSelected() {
        this.els.showSelected.removeClass(ClassName.ACTIVE);
      }
    }, {
      key: "_preventDropdownHide",
      value: function _preventDropdownHide() {
        if (this._dropdownActive()) {
          this.els.dropdown.one('hide.bs.dropdown', function (event) {
            event.preventDefault();
          });
        }
      }
    }, {
      key: "_searchControlFocus",
      value: function _searchControlFocus() {
        this.els.controlSearch.focus().val(this.els.controlSearch.val());
      }
      /**
       * Helper: Reset scroll.
       *
       * Scroll the dropdown menu to the top.
       * @return {[type]} [description]
       */

    }, {
      key: "_resetScroll",
      value: function _resetScroll() {
        this.els.dropdownMenu.scrollTop(0);
      }
      /**
       * Helper: Class to selector.
       *
       * Convert a space separated class list to a selector.
       * @param  {string} classList Space separated list of classes.
       * @return {string}           Selector.
       */

    }, {
      key: "_classListToSelector",
      value: function _classListToSelector(classList) {
        var selector = classList;

        if (classList.length) {
          var classes = classList.split(/\s+/);
          selector = '.' + classes.join('.');
        }

        return selector;
      }
    }, {
      key: "_alignLeft",
      value: function _alignLeft() {//this.els.dropdownMenu.css('width', '100%');
        //this.els.dropdownMenu.removeClass( ClassName.ALIGNMENT_RIGHT );
        //this.els.btnSelect.dropdown('update');
      }
    }, {
      key: "_alignRight",
      value: function _alignRight() {} //this.els.dropdownMenu.css('width', 'auto');
      //this.els.dropdownMenu.addClass( ClassName.ALIGNMENT_RIGHT );
      //this.els.btnSelect.dropdown('update');

      /**
       * Helper: Compare two arrays.
       *
       * @see https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
       */

    }, {
      key: "_arraysEqual",
      value: function _arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }

        return true;
      } // Static

    }], [{
      key: "_jQueryInterface",
      value: function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _config = _objectSpread({}, SelectDropdown.Default, {}, $(this).data(), {}, _typeof(config) === 'object' && config, {
            SelectDropdownIndex: SelectDropdownIndex
          });

          SelectDropdownIndex++;

          if (!data) {
            data = new SelectDropdown(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"".concat(config, "\""));
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      }
    }, {
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
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


  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_ROLE).each(function () {
      var $selectDropdown = $(this);

      SelectDropdown._jQueryInterface.call($selectDropdown, $selectDropdown.data());
    });
  });
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
}(external_$_default.a, external_Fuse_default.a);

/* harmony default export */ var bootstrap_select_dropdown = __webpack_exports__["default"] = (bootstrap_select_dropdown_SelectDropdown);

/***/ })
/******/ ]);