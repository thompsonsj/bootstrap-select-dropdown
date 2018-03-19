import $ from 'jquery'
import Util from 'bootstrap/js/src/util'
import Fuse from 'fuse.js'

let SelectDropdownIndex = 1

/**
 * --------------------------------------------------------------------------
 * Bootstrap Select Dropdown
 * --------------------------------------------------------------------------
 */

 const SelectDropdown = (($) => {
   /**
    * ------------------------------------------------------------------------
    * Constants
    * ------------------------------------------------------------------------
    */

   const NAME               = 'selectDropdown'
   const VERSION            = '0.7.0'
   const DATA_KEY           = 'bs.selectDropdown'
   const EVENT_KEY          = `.${DATA_KEY}`
   const DATA_API_KEY       = '.data-api'
   const JQUERY_NO_CONFLICT = $.fn[NAME]
   const ENTER_KEYCODE      = 13
   const ESCAPE_KEYCODE     = 27
   const ARROW_UP_KEYCODE   = 38
   const ARROW_DOWN_KEYCODE = 40

   const Default = {
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
     classBtnClear : "btn btn-outline-secondary",
     classBtnSearch : "btn btn-primary"
   }

   const DefaultType = {
     maxListLength        : 'number',
     hideSelect           : 'boolean',
     search               : 'boolean',
     observeDomMutations  : 'boolean',
     maxHeight            : 'string',
     keyboard             : 'boolean',
     textNoneSelected     : 'string',
     textMultipleSelected : 'string',
     textNoResults        : 'string',
     htmlClear            : 'string',
     classBtnClear        : 'string',
     classBtnSearch       : 'string'
   }

   const Event = {
     KEYUP             : `keyup${EVENT_KEY}`,
     HIDE              : `hide${EVENT_KEY}`,
     HIDDEN            : `hidden${EVENT_KEY}`,
     SHOW              : `show${EVENT_KEY}`,
     SHOWN             : `shown${EVENT_KEY}`,
     FOCUSIN           : `focusin${EVENT_KEY}`,
     RESIZE            : `resize${EVENT_KEY}`,
     CLICK_DISMISS     : `click.dismiss${EVENT_KEY}`,
     KEYDOWN_DISMISS   : `keydown.dismiss${EVENT_KEY}`,
     MOUSEUP_DISMISS   : `mouseup.dismiss${EVENT_KEY}`,
     MOUSEDOWN_DISMISS : `mousedown.dismiss${EVENT_KEY}`,
     CLICK_DATA_API    : `click${EVENT_KEY}${DATA_API_KEY}`
   }

   const ClassName = {
     DROPDOWN           : 'dropdown',
     MENU               : 'dropdown-menu',
     ITEM               : 'dropdown-item',
     HOVER              : 'hover',
     ALIGNMENT_RIGHT    : '.dropdown-menu-right'
   }

   const Selector = {
     DATA_TOGGLE        : '[data-toggle="select-dropdown"]'
   }

   /**
    * ------------------------------------------------------------------------
    * Class Definition
    * ------------------------------------------------------------------------
    */

  class SelectDropdown {
    constructor(element, config) {
      this._config                  = this._getConfig(config)
      this._element                 = element
      this._prefix                  = 'bsd' + this._config.SelectDropdownIndex + '-'

      this._multiselect        = this._isMultiselect(element)
      this._indexes = []
      this._lastSearch = null
      this._resultsChanged = false
      this._hoverItem = $()

      this.ids = {};
      this.ids.dropdownContainerId = this._prefix + 'container'
      this.ids.dropdownButtonId = this._prefix + 'button'
      this.ids.controlSearchId = this._prefix + 'search'
      this.ids.dropdownItemDeselect = this._prefix + 'deselect'
      this.ids.dropdownItemShowSelected = this._prefix + 'selected'

      // Properties: Elements.
      this.els = {}
      this.els.button = this.buildButton()
      this.els.buttonClear = this.buildButtonClear()
      this.els.controlSearch = this.buildcontrolSearch()
      this.els.controlDeselect = this.buildDeselectAll()
      this.els.controlSelected = this.buildShowSelected()
      this.els.dropdown = this.buildDropdownMenu()
      this.els.dropdownItemsContainer = this.buildDropdownItemsContainer()
      this.els.dropdownItemNoResults = this.buildDropdownItemNoResults()
      this.els.dropdownItems = this.buildDropdownItems()
      this.els.dropdownOptions = this.els.dropdownItems.filter( ( index, element ) => {
        return this.isOption( $( element ) )
      })

      if (this._config.search) {
        this._haystack = []
        this._fuseOptions = {
          keys: ['text'],
          id: 'index'
        }
        this.els.dropdownOptions.each( ( index, element ) => {
          this._haystack[ index ] = {
            index : $( element ).data('index'),
            text : $( element ).text()
          };
        });
      }

      this._addEventListeners()

      this.init()
    }

    // Getters

    static get VERSION() {
      return VERSION
    }

    static get Default() {
      return Default
    }

    // Public

    /**
     * Set hover class position.
     *
     * Move the hover class to a designated dropdown option. If the index points
     * to a non-option, the next option will be modified.
     * @param {integer} index Dropdown menu item index.
     */
    hoverSet( index ) {
      var _ = this;
      _.els.dropdownOptions.removeClass( ClassName.HOVER );
      if ( typeof index === typeof undefined ) {
        var $item = _.els.dropdownOptions.first();
      } else {
        var $item = _.dropdownItemByIndex( index );
      }
      _._hoverItem = $item;
      $item.addClass( ClassName.HOVER );
    }

    /**
     * Move the hover class up.
     *
     * @return void
     */
    hoverUp() {
      var _ = this;
      var current = _._hoverItem;
      if (
        typeof current !== typeof undefined &&
        current.length
      ) {
        var prev = current.prevAll('a:visible').first();
      }
      if ( typeof prev !== typeof undefined && prev.length ) {
        current.removeClass( ClassName.HOVER );
        prev.addClass( ClassName.HOVER );
        _._hoverItem = prev;
      }
    }

    /**
     * Move the hover class down.
     *
     * @return void
     */
    hoverDown() {
      var _ = this;
      var current = _._hoverItem;
      if (
        typeof current !== typeof undefined &&
        current.length
      ) {
        var next = current.nextAll('a:visible').first();
      }
      if ( typeof next !== typeof undefined && next.length ) {
        current.removeClass( ClassName.HOVER );
        next.addClass( ClassName.HOVER );
        _._hoverItem = next;
      }
    }

    /**
     * Remove hover class from all dropdown options.
     * @return void
     */
    hoverRemove() {
      var _ = this;
      _.els.dropdownItems.removeClass( ClassName.HOVER ).show();
    }

    /**
     * Select/Deselect a dropdown item, and update the corresponding option.
     * @param  {object} $dropdownItem jQuery object
     * @return void
     */
    toggle( $dropdownItem ) {
      var _ = this;
      var $el =  $( _._element );
      var itemIndex = $dropdownItem.data('option');
      var $option = $el.find('option').eq( itemIndex );
      if ( $option.is(':selected') ) {
        $option.prop('selected', false);
        $dropdownItem.removeClass('active');
      }
      else {
        if ( !_._multiselect ) {
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
    deselectAll() {
      var _ = this;
      var $el =  $( _._element );
      _.els.dropdownOptions.each( function(){
        _.deselect( $( this ) );
      });
      _.refresh();
    }

    /**
     * Deselect a dropdown item.
     * @param  {object} $dropdownItem jQuery object
     * @return void
     */
    deselect( $dropdownItem ){
      var _ = this;
      var $el =  $( _._element );
      var itemIndex = $dropdownItem.data('option');
      var $option = $el.find('option').eq( itemIndex );
      if ( $option.is(':selected') ) {
        _.toggle( $dropdownItem );
      }
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default,
        ...config
      }
      Util.typeCheckConfig(NAME, config, DefaultType)
      return config
    }

    _addEventListeners() {
      if (this._config.search) {
        this.els.controlSearch
          .on(Event.KEYUP, (event) => this._keyup(event))
      }
    }

    _keyup(event) {
      if (this._config.keyboard) {
        if ( event.which == ENTER_KEYCODE ) {
          this.toggle( this.els.dropdown.find('.hover').first() );
          if ( !this._multiselect ) {
            this.els.button.dropdown('toggle');
          }
          return;
        }
        else if ( event.which == ARROW_UP_KEYCODE ) {
          if ( !this.dropdownActive() ) {
            this.els.button.dropdown('toggle');
            this.els.controlSearch.focus();
          }
          this.hoverUp();
          return;
        }
        else if ( event.which == ARROW_DOWN_KEYCODE ) {
          if ( !this.dropdownActive() ) {
            this.els.button.dropdown('toggle');
            this.els.controlSearch.focus();
          }
          this.hoverDown();
          return;
        }
      }
      this._search( $( this.els.controlSearch ).val() )
    }

    init() {
      var _ = this; // Deep reference to this.
      var $el = $( _._element );

      // Handle cut and paste.
      _.els.controlSearch.bind({
          paste (){
            $(this).trigger('keydown');
          },
          cut (){
            $(this).trigger('keydown');
          }
      });

      // Build.
      _.setButtonText();
      var $dropdown = _.buildDropdown();
      $dropdown
        .append( _.els.dropdown );
      _.els.dropdownItemsContainer
        .append( _.els.dropdownItems );
      if ( _._multiselect ) {
        _.els.dropdown
          .append( _.els.controlDeselect )
          .append( _.els.controlSelected );
      }
      _.els.dropdown
        .append( _.els.dropdownItemsContainer );
      $el.after( $dropdown );
      if ( _._config.hideSelect ) {
        $el.hide();
      }

      // Set/Remove hover
      _.els.controlSearch.on('focus', function(){
        _.hoverSet();
      });
      _.els.controlSearch.on('blur', function(){
        _.hoverRemove();
      });

      // Assign click handler: Select item.
      _.els.dropdownOptions.on('click', function( event ){
        event.preventDefault();
        if ( _._multiselect ) {
          $dropdown.one('hide.bs.dropdown', function ( event ) {
            event.preventDefault();
          });
        }
        _.toggle( $(this) );
      });

      // Assign click handler: Deselect all.
      _.els.controlDeselect.on('click', function( event ){
        event.preventDefault();
        $dropdown.one('hide.bs.dropdown', function ( event ) {
          event.preventDefault();
        });
        if ( !$(this).hasClass('disabled') ) {
          _.deselectAll();
        }
      });

      // Assign click handler: Show selected.
      _.els.controlSelected.on('click', function( event ){
        event.preventDefault();
        $dropdown.one('hide.bs.dropdown', function ( event ) {
          event.preventDefault();
        });
        if ( !$(this).hasClass('disabled') ) {
          _.sortSelected();
        }
      });

      // Assign click handler: Clear search.
      _.els.buttonClear.on('click', function() {
        _.els.controlSearch.val('');
        if ( _.dropdownActive() ) {
          $dropdown.one('hide.bs.dropdown', function ( event ) {
            event.preventDefault();
          });
        }
        _.refresh();
      });

      // Assign click handler: No results.
      _.els.dropdownItemNoResults.on('click', function( event ) {
        event.preventDefault();
        $dropdown.one('hide.bs.dropdown', function ( event ) {
          event.preventDefault();
        });
      });

      // On search focus: Toggle dropdown.
      // - Can reliance on setTimeout be removed?
      // - Should we depend on an aria attribute for plugin logic?
      if ( _._config.search ) {
        _.els.controlSearch.on('focusin', function(){
          if ( _.els.button.attr('aria-expanded') == 'false' ) {
            _.els.button.dropdown('toggle');
            setTimeout(function(){
              _.els.controlSearch.focus();
            }, 1);
          }
        });
      }

      _.refreshInitialControls();

      // DOM mutation observer
      if ( _._config.observeDomMutations ) {
        var config = { childList: true, subtree: true };
        var callback = function( mutationsList ) {
          for( var mutation of mutationsList ) {
            if ( mutation.type == 'childList') {
              _.refresh();
            }
          }
        };
        var observer = new MutationObserver( callback );
        observer.observe( $el[0], config );
      }
    }

    /**
     * Check whether the supplied element has a `multiple` attribute,
     * @param  {object}  element
     * @return {Boolean}
     */
    _isMultiselect(element) {
      var attrMultiple = $(element).attr('multiple');
      if ( typeof attrMultiple !== typeof undefined && attrMultiple !== false ) {
        return true;
      }
      return false;
    }

    _search( s ) {
      var results = null;
      if ( $.trim( s ) == '' ) {
        this.refresh();
        if ( this._lastSearch !== null ) {
          this._resultsChanged = true;
          this._lastSearch = null;
        }
        return;
      } else {
        var fuse = new Fuse( this._haystack, this._fuseOptions );
        results = fuse.search(s);
      }
      this._resultsChanged = true;
      if ( results ) {
        if (
          typeof this._lastSearch !== null &&
          this.arraysEqual( results, this._lastSearch )
        ) {
          this._resultsChanged = false;
        }

      } else {
        this.refresh();
        return;
      }
      if ( this._resultsChanged ) {
        this.hoverSet( results[0] );
        this.hide( results );
        this.reorder( results );
        this.resetScroll();
      }
      this._lastSearch = results;
    }

    buildDropdown() {
      var _ = this;

      var $dropdown = $('<div>', {
        id : _.ids.dropdownContainerId,
        class : ClassName.DROPDOWN
      });

      if ( _._config.search ) {

        // Build dropdown.
        $dropdown.append(
          $('<div>', {
            class: 'input-group'
          })
          .append( _.els.controlSearch )
          .append(
            $('<div>', {
              class: 'input-group-append'
            })
            .append( _.els.buttonClear )
          )
          .append(
            $('<div>', {
              class: 'input-group-append'
            })
            .append( _.els.button )
          )
        );

        // Move dropdown menu to the right.
        _.els.dropdown.addClass('dropdown-menu-right');
      } else {

        // Build dropdown.
        $dropdown
          .append( _.els.button );
      }

      return $dropdown;
    }

    buildButton() {
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

    buildButtonClear(){
      var _ = this;
      return $('<button>', {
        type: 'button',
        class: _._config.classBtnClear
      })
      .html( _._config.htmlClear );
    }

    buildcontrolSearch() {
      var _ = this;
      return $('<input>', {
        type: 'text',
        class: 'form-control',
        placeholder: 'Search',
        'aria-label': 'Search',
        'aria-describedby': _.ids.controlSearchId
      });
    }

    buildDropdownMenu() {
      var _ = this;
      var $dropdownMenu = $('<div>', {
        class: ClassName.MENU,
        'aria-labelledby': _.ids.dropdownButtonId
      });
      if ( _._config.maxHeight ) {
        $dropdownMenu
          .css({
            'height': 'auto',
            'max-height': _._config.maxHeight,
            'overflow-x': 'hidden'
          });
      }
      return $dropdownMenu;
    }

    buildDropdownItemsContainer() {
      return $('<div>');
    }

    buildDropdownItems() {
      var _ = this;
      var $el = $( _._element );
      var s = 0; // Sort index
      var o = 0; // Option index
      var $items = $();
      var $optgroups = $el.find('optgroup');
      if ( $optgroups.length ) {
        $optgroups.each( function(){
          $items = $items.add( _.buildDropdownHeader( $( this ).attr('label') ).data('index', s ) );
          s = _.incrementIndex( s );
          $( this ).find('option').each( function() {
            $items = $items.add( _.buildDropdownItem( $( this ) ).data('index', s ).data('option', o) );
            s = _.incrementIndex( s );
            o++;
          });
        });
      } else {
        $el.find('option').each( function( index, value ) {
          $items = $items.add( _.buildDropdownItem( $( this ) ).data('index', s ).data('option', o) );
          s = _.incrementIndex( s );
          o++;
        });
      }
      if ( _._config.search ) {
        $items = $items.add( _.els.dropdownItemNoResults );
      }
      return $items;
    }

    incrementIndex( index ) {
      var _ = this;
      _._indexes.push( index.toString() );
      index++;
      return index;
    }

    buildDropdownHeader( text ) {
      return $( '<h6>', {
        class: 'dropdown-header',
        text: text
      });
    }

    buildDropdownItem( $option ) {
      var _ = this;
      var $dropdownItem = $( '<a>', {
        href: '#',
        class: ClassName.ITEM,
        text: $option.text()
      });
      if ( $option.is(':selected') ) {
        $dropdownItem.addClass('active');
      }
      return $dropdownItem;
    }

    buildDropdownItemNoResults() {
      var _ = this;
      return $( '<span>', {
        class: ClassName.ITEM + ' ' + 'text-muted no-results',
        text: _._config.textNoResults
      }).hide();
    }

    buildDeselectAll() {
      var _ = this;
      var $deselectItem = $('<a>', {
        href: '#',
        id: _.ids.dropdownItemDeselect,
        class:  ClassName.ITEM,
        text: 'Deselect all'
      });
      return $deselectItem;
    }

    buildShowSelected() {
      var _ = this;
      var $showSelectedItem = $('<a>', {
        href: '#',
        id: _.ids.dropdownItemShowSelected,
        class:  ClassName.ITEM,
        text: 'Show selected'
      });
      return $showSelectedItem;
    }

    dropdownActive() {
      var _ = this;
      if ( _.els.dropdown.hasClass('show') ) {
        return true;
      }
      return false;
    }

    /**
     * Check if a dropdown item refers to a select option.
     * @param  {object}  $item jQuery object.
     * @return {Boolean}
     */
    isOption( $item ) {
      var attr = $item.data('option');
      if (typeof attr !== typeof undefined && attr !== false) {
        return true;
      }
      return false;
    }

    setButtonText() {
      var _ = this;
      var $el = $( _._element );
      var $btn = _.els.button;
      var selected = $el.val();
      if ( selected.length < 1 ) {
        $btn.text( _._config.textNoneSelected );
      }
      else if ( selected.length <= _._config.maxListLength ) {
        var textValues = $el
          .find('option:selected')
          .map(function (i, element) {
            return $(element).text();
          })
          .get();
        $btn.text( textValues.join(", ") );
      }
      else {
        $btn.text( _._config.textMultipleSelected );
      }
    }

    refresh() {
      var _ = this;
      _.hoverRemove();
      _.els.dropdownItemNoResults.hide();
      _.sortReset();
      _.showInitialControls();
    }

    hide( results ) {
      var _ = this;
      var notResults = $(_._indexes).not(results).get();
      $.each( notResults, function( index, value ) {
        _.dropdownItemByIndex( value ).hide();
      });
      _.els.button.dropdown('update');
    }

    dropdownItemByIndex( index ) {
      var _ = this;
      return _.els.dropdownItems.filter( function(){
        return $(this).data('index') == index;
      });
    }

    hideInitialControls() {
      var _ = this;
      _.els.controlDeselect.hide();
      _.els.controlSelected.hide();
    }

    showInitialControls( prepend ) {
      prepend = (typeof prepend !== typeof undefined ) ?  prepend : false;
      var _ = this;
      if ( prepend ) {
        _.els.controlSelected.prependTo( _.els.dropdown );
        _.els.controlDeselect.prependTo( _.els.dropdown );
      }
      _.els.controlSelected.show();
      _.els.controlDeselect.show();
    }

    refreshInitialControls() {
      var _ = this;
      var $el = $( _._element );
      if ( !$el.val() || $el.val().length == 0 ) {
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
    sortReset() {
      var _ = this;
      var i;
      for ( i = _.els.dropdownItems.length; i >= 0; i--) {
        _.dropdownItemByIndex( i ).prependTo( _.els.dropdownItemsContainer );
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
    reorder( indexes ) {
      var _ = this;
      _.els.dropdownItemNoResults.hide();
      if ( typeof indexes === typeof undefined || indexes.length == 0) {
        _.els.dropdownItemNoResults.show();
        return;
      }
      var indexesReversed = indexes.slice(0); // Clone
      indexesReversed = indexesReversed.reverse();
      $.each( indexesReversed, function( index, value ) {
        _.dropdownItemByIndex( value ).prependTo( _.els.dropdownItemsContainer );
      });
      _.hideInitialControls();
    }

    /**
     * Sort: Move selected items to the top.
     * @return void
     */
    sortSelected() {
      var _ = this;
      var $el = $( _._element );
      _.els.dropdownOptions.removeClass( ClassName.HOVER );
      $( _.els.dropdown.find('.active').get().reverse() ).each( function(){
        $( this ).prependTo( _.els.dropdownItemsContainer );
      });
      _.showInitialControls( true );
      _.resetScroll();
    }

    /**
     * Helper: Reset scroll.
     *
     * Scroll the dropdown menu to the top.
     * @return {[type]} [description]
     */
    resetScroll() {
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
    classListToSelector( classList ) {
      var selector = classList;
      if ( classList.length ) {
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
    arraysEqual( a, b ) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length != b.length) return false;
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    // Static

    static _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)
        const _config = {
          ...SelectDropdown.Default,
          ...$(this).data(),
          ...typeof config === 'object' && config,
          SelectDropdownIndex
        }

        SelectDropdownIndex++;

        if (!data) {
          data = new SelectDropdown(this, _config)
          $(this).data(DATA_KEY, data)
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }
          data[config](relatedTarget)
        } else if (_config.show) {
          data.show(relatedTarget)
        }
      })
    }
  }

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

  $.fn[NAME] = SelectDropdown._jQueryInterface
  $.fn[NAME].Constructor = SelectDropdown
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return SelectDropdown._jQueryInterface
  }

  return SelectDropdown
})($, Fuse)

export default SelectDropdown
