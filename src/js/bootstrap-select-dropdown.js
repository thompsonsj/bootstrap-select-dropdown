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
   const VERSION            = '[AIV]{version}[/AIV]'
   const DATA_KEY           = 'bs.selectDropdown'
   const EVENT_KEY          = `.${DATA_KEY}`
   const DATA_API_KEY       = '.data-api'
   const JQUERY_NO_CONFLICT = $.fn[NAME]
   const ENTER_KEYCODE      = 13
   const ESCAPE_KEYCODE     = 27
   const ARROW_UP_KEYCODE   = 38
   const ARROW_DOWN_KEYCODE = 40

   const Default = {
     // Profile
     profile: "default",
     // Behaviour
     maxListLength: 4,
     hideSelect: true,
     search: true,
     observeDomMutations: false,
     maxHeight: '300px',
     keyboard: true,
     badges: false,
     badgesDismissable: true,
     // Text
     textNoneSelected: "None selected",
     textMultipleSelected: "%count_selected% selected",
     textNoResults: "No results",
     // Buttons
     btnClear: true,
     btnDeselectAll: true, // Multiselect only
     btnSelectAll: true, // Multiselect only
     // HTML
     htmlBtnClear: "Clear search",
     htmlBtnDeselectAll: "Deselect all", // Multiselect only
     htmlBtnSelectAll: "Select all", // Multiselect only
     htmlBtnBadgeRemove: "[deselect]", // Badges only
     // Classes
     classBtnClear : "btn btn-outline-secondary",
     classBtnDeselectAll : "btn btn-outline-secondary", // Multiselect only
     classBtnSelectAll : "btn btn-outline-secondary", // Multiselect only
     classBtnSelect : "btn btn-primary",
     classBadge: "badge badge-dark mr-1",
     classBadgeContainer : "mt-2 mb-3"
   }

   const DefaultType = {
     maxListLength        : 'number',
     hideSelect           : 'boolean',
     search               : 'boolean',
     observeDomMutations  : 'boolean',
     maxHeight            : 'string',
     keyboard             : 'boolean',
     badges               : 'boolean',
     badgesDismissable    : 'boolean',
     textNoneSelected     : 'string',
     textMultipleSelected : 'string',
     textNoResults        : 'string',
     btnClear             : 'boolean',
     btnDeselectAll       : 'boolean',
     btnSelectAll         : 'boolean',
     htmlBtnClear         : 'string',
     htmlBtnDeselectAll   : 'string',
     htmlBtnSelectAll     : 'string',
     htmlBtnBadgeRemove   : 'string',
     classBtnClear        : 'string',
     classBtnDeselectAll  : 'string',
     classBtnSelectAll    : 'string',
     classBtnSelect       : 'string',
     classBadge           : 'string',
     classBadgeContainer  : 'string'
   }

   const Event = {
     CLICK             : `click${EVENT_KEY}`,
     KEYUP             : `keyup${EVENT_KEY}`,
     KEYDOWN           : `keydown${EVENT_KEY}`,
     FOCUS             : `focus${EVENT_KEY}`,
     BLUR              : `blur${EVENT_KEY}`,
     FOCUSIN           : `focusin${EVENT_KEY}`,
     LOAD_DATA_API     : `load${EVENT_KEY}${DATA_API_KEY}`
   }

   const ClassName = {
     DROPDOWN           : 'dropdown',
     MENU               : 'dropdown-menu',
     ITEM               : 'dropdown-item',
     BTN_GROUP          : 'btn-group',
     INPUT_GROUP        : 'input-group',
     INPUT_GROUP_APPEND : 'input-group-append',
     HOVER              : 'hover',
     ALIGNMENT_RIGHT    : 'dropdown-menu-right'
   }

   const Selector = {
     DATA_ROLE          : '[data-role="select-dropdown"]'
   }

   const Keyword = {
     COUNT_SELECTED     : '%count_selected%'
   }

   /**
    * ------------------------------------------------------------------------
    * Class Definition
    * ------------------------------------------------------------------------
    */

  class SelectDropdown {
    constructor(element, config) {
      this._multiselect = this._isMultiselect(element)
      this._config  = this._getConfig(config)
      this._element = element
      this._prefix  = 'bsd' + this._config.SelectDropdownIndex + '-'

      this._indexes = []
      this._lastSearch = null
      this._resultsChanged = false
      this._hoverItem = $()

      this.ids = {}
      this.ids.dropdownContainerId = this._prefix + 'container'
      this.ids.dropdownButtonId = this._prefix + 'button'
      this.ids.controlSearchId = this._prefix + 'search'
      this.ids.dropdownItemDeselect = this._prefix + 'deselect'
      this.ids.dropdownItemShowSelected = this._prefix + 'selected'

      // Selectors.
      this.selectors = {}
      if ( this._config.badges ) {
        this.selectors.badge = this._classListToSelector( this._config.classBadge )
      }

      // Properties: Elements.
      this.els = {}
      this.els.btnSelect = this._buildBtnSelect()
      if ( this._config.search ) {
        this.els.controlSearch = this._buildControlSearch()
      }
      if ( this._config.btnClear ) {
        this.els.btnClear = this._buildBtnClear()
      }
      if ( this._config.btnDeselectAll ) {
        this.els.btnDeselectAll = this._buildBtnDeselectAll()
      }
      if ( this._config.btnSelectAll ) {
        this.els.btnSelectAll = this._buildBtnSelectAll()
      }
      this.els.controlSelected = this._buildShowSelected()
      this.els.dropdown = this._buildDropdown()
      this.els.dropdownMenu = this._buildDropdownMenu() //This should be dropdown menu so we can build and refer to dropdown, the main container.
      this.els.dropdownItemsContainer = this._buildDropdownItemsContainer()
      this.els.dropdownItemNoResults = this._buildDropdownItemNoResults()
      this.els.dropdownItems = this._buildDropdownItems()
      this.els.dropdownOptions = this.els.dropdownItems.filter( ( index, element ) => {
        return this._isOption( $( element ) )
      })
      if ( this._config.badges ) {
        this.els.badgeContainer = this._buildBadgeContainer()
      }

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
     * Select/Deselect a dropdown item, and update the corresponding option.
     * @param  {object} $dropdownItem jQuery object
     * @return {undefined}
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
      _._externalFeedback();
      _._refreshInitialControls();
    }

    /**
     * Deselect a dropdown item.
     * @param  {object} $dropdownItem jQuery
     * @return {undefined}
     */
    deselect( $dropdownItem ){
      var $el =  $( this._element );
      var itemIndex = $dropdownItem.data('option');
      var $option = $el.find('option').eq( itemIndex );
      if ( $option.is(':selected') ) {
        this.toggle( $dropdownItem );
      }
    }

    /**
     * Select a dropdown item.
     * @param  {object} $dropdownItem jQuery
     * @return {undefined}
     */
    select( $dropdownItem ){
      var $el =  $( this._element );
      var itemIndex = $dropdownItem.data('option');
      var $option = $el.find('option').eq( itemIndex );
      if ( !$option.is(':selected') ) {
        this.toggle( $dropdownItem );
      }
    }

    /**
     * Deselect all dropdown items.
     * @return {undefined}
     */
    deselectAll() {
      var $el =  $(this._element)
      $el.find('option').prop('selected', false)
      this.els.dropdownOptions.removeClass('active')
      this._externalFeedback()
      this._refreshInitialControls()
      this._refresh()
    }

    /**
     * Select all dropdown items.
     * @return {undefined}
     */
    selectAll() {
      var $el =  $(this._element)
      $el.find('option').prop('selected', true)
      this.els.dropdownOptions.addClass('active')
      this._externalFeedback()
      this._refreshInitialControls()
      this._refresh()
    }

    // Private

    _getConfig(config) {
      config = {
        ...Default,
        ...config
      }
      Util.typeCheckConfig(NAME, config, DefaultType)
      // Defaults: Enforce logic.
      if ( !config.search ) {
        config.btnClear = false
      }
      if ( !this._multiselect ) {
        config.btnDeselectAll = false
        config.btnSelectAll = false
      }
      return config
    }

    _addEventListeners() {
      if (this._config.search) {
        this.els.controlSearch
          .on(Event.KEYUP, (event) => this._keyup(event))
        this.els.controlSearch
          .on(Event.FOCUS, (event) => {
            this._hoverSet()
            if ( this.els.btnSelect.attr('aria-expanded') == 'false' ) {
              this._alignLeft()
              this.els.btnSelect.dropdown('toggle');
              setTimeout( () => {
                this.els.controlSearch.focus();
              }, 1);
            }
          })
        this.els.controlSearch
          .on(Event.BLUR, (event) => {
            this._hoverRemove()
            this._alignRight()
          })
      }
      // Handle cut and paste.
      this.els.controlSearch.bind({
          paste (){
            $(this).trigger( Event.KEYDOWN );
          },
          cut (){
            $(this).trigger( Event.KEYDOWN );
          }
      });
      this._assignClickHandlers();
    }

    _keyup(event) {
      if (this._config.keyboard) {
        if ( event.which == ENTER_KEYCODE ) {
          this.toggle( this.els.dropdown.find('.hover').first() );
          if ( !this._multiselect ) {
            this.els.btnSelect.dropdown('toggle');
          }
          return;
        }
        else if ( event.which == ARROW_UP_KEYCODE ) {
          if ( !this._dropdownActive() ) {
            this.els.btnSelect.dropdown('toggle');
            this.els.controlSearch.focus();
          }
          this._hoverUp();
          return;
        }
        else if ( event.which == ARROW_DOWN_KEYCODE ) {
          if ( !this._dropdownActive() ) {
            this.els.btnSelect.dropdown('toggle');
            this.els.controlSearch.focus();
          }
          this._hoverDown();
          return;
        }
      }
      this._search( $( this.els.controlSearch ).val() )
    }

    _assignClickHandlers() {
      // Select item.
      this.els.dropdownOptions.on( Event.CLICK, ( event ) => {
        event.preventDefault()
        if ( this._multiselect ) {
          this._preventDropdownHide()
        }
        this.toggle( $( event.currentTarget ) )
      })

      // Deselect all.
      if ( this._config.btnDeselectAll ) {
        this.els.btnDeselectAll.on( Event.CLICK, ( event ) => {
          event.preventDefault()
          this._preventDropdownHide()
          if (!$( event.currentTarget ).hasClass('disabled')) {
            this.deselectAll()
          }
        })
      }

      // Select all.
      if ( this._config.btnSelectAll ) {
        this.els.btnSelectAll.on( Event.CLICK, ( event ) => {
          event.preventDefault()
          this._preventDropdownHide()
          if (!$( event.currentTarget ).hasClass('disabled')) {
            this.selectAll()
          }
        })
      }

      // Clear search.
      if ( this._config.btnClear ) {
        this.els.btnClear.on( Event.CLICK, () => {
          this.els.controlSearch.val('')
          this._preventDropdownHide()
          this._refresh()
        })
      }

      // Show selected.
      this.els.controlSelected.on( Event.CLICK, (event) => {
        event.preventDefault();
        this._preventDropdownHide()
        if ( !$( event.currentTarget ).hasClass('disabled') ) {
          this._sortSelected();
        }
      });

      // No results.
      this.els.dropdownItemNoResults.on( Event.CLICK, (event) => {
        event.preventDefault();
        this._preventDropdownHide()
      });

      // Badges.
      if ( this._config.badges ) {
        this.els.badgeContainer.on( Event.CLICK, 'a', (event) => {
          event.preventDefault()
          let $target = $( event.currentTarget )
          this.deselect( this._dropdownItemByOption( $target.data('option') ) )
          $target.parent( this.selectors.badge ).remove()
        })
      }
    }

    init() {
      var _ = this; // Deep reference to this.
      var $el = $( _._element );

      // Build.
      _._externalFeedback();
      this.els.dropdown
        .append( _.els.dropdownMenu );
      _.els.dropdownItemsContainer
        .append( _.els.dropdownItems );
      if ( _._multiselect ) {
        _.els.dropdownMenu
          .append( _.els.controlSelected );
      }
      _.els.dropdownMenu
        .append( _.els.dropdownItemsContainer );
      $el.after( this.els.dropdown );
      if ( _._config.hideSelect ) {
        $el.hide();
      }
      if( this._config.badges ) {
        this.els.dropdown.after(
          this.els.badgeContainer
        )
      }

      _._refreshInitialControls();

      // DOM mutation observer
      if ( _._config.observeDomMutations ) {
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
      }
    }

    /**
     * Check whether the supplied element has a `multiple` attribute,
     * @param  {Object}  element
     * @return {Boolean}
     */
    _isMultiselect(element) {
      var attrMultiple = $(element).attr('multiple');
      if ( typeof attrMultiple !== typeof undefined && attrMultiple !== false ) {
        return true;
      }
      return false;
    }

    /**
     * Search and take appropriate action.
     *
     * * If results haven't changed, do nothing (improves performance).
     * * If results have changed, hide non-matching options, reorder...etc.
     * @param  {String} s Search term
     * @return {undefined}
     */
    _search(s) {
      var results = null;
      if ( $.trim( s ) == '' ) {
        this._refresh();
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
          this._arraysEqual( results, this._lastSearch )
        ) {
          this._resultsChanged = false;
        }

      } else {
        this._refresh();
        return;
      }
      if ( this._resultsChanged ) {
        this._hoverSet( results[0] );
        this._hide( results );
        this._reorder( results );
        this._resetScroll();
      }
      this._lastSearch = results;
    }

    _buildBtnSelect() {
      var _ = this;
      return $('<button>', {
        class: _._config.classBtnSelect + ' dropdown-toggle',
        type: 'button',
        id: _.ids.dropdownButtonId,
        'data-toggle': 'dropdown',
        'data-target': '#' + _.ids.dropdownContainerId,
        'aria-haspopup': 'true',
        'aria-expanded': 'false'
      })
      .text('Select');
    }

    /**
     * Build HTML: Clear button
     * @return {object} jQuery
     */
    _buildBtnClear(){
      var _ = this;
      return $('<button>', {
        type: 'button',
        class: _._config.classBtnClear
      })
      .html( _._config.htmlBtnClear );
    }

    /**
     * Build HTML: Deselect all button
     * @return {object} jQuery
     */
    _buildBtnDeselectAll() {
      var _ = this;
      return $('<button>', {
        type: 'button',
        class: _._config.classBtnDeselectAll
      })
      .html( _._config.htmlBtnDeselectAll );
    }

    /**
     * Build HTML: Select all button
     * @return {object} jQuery
     */
    _buildBtnSelectAll() {
      var _ = this;
      return $('<button>', {
        type: 'button',
        class: _._config.classBtnSelectAll
      })
      .html( _._config.htmlBtnSelectAll );
    }

    _buildShowSelected() {
      var _ = this;
      var $showSelectedItem = $('<a>', {
        href: '#',
        id: _.ids.dropdownItemShowSelected,
        class:  ClassName.ITEM,
        text: 'Show selected'
      });
      return $showSelectedItem;
    }

    _buildControlSearch() {
      return $('<input>', {
        type: 'text',
        class: 'form-control',
        placeholder: 'Search',
        'aria-label': 'Search',
        'aria-describedby': this.ids.controlSearchId
      });
    }

    _buildDropdown() {
      var $dropdown = $('<div>', {
        id : this.ids.dropdownContainerId,
        class : ClassName.DROPDOWN
      })

      // Build dropdown.
      if ( this._config.search ) {
        let $inputGroup = $('<div>', {
          class: ClassName.INPUT_GROUP
        })

        $inputGroup.append( this.els.controlSearch )

        if ( this._config.btnClear ) {
          $inputGroup
            .append(
              $('<div>', {
                class: ClassName.INPUT_GROUP_APPEND
              })
            .append( this.els.btnClear )
          )
        }

        if ( this._config.btnDeselectAll ) {
          $inputGroup
            .append(
              $('<div>', {
                class: ClassName.INPUT_GROUP_APPEND
              })
            .append( this.els.btnDeselectAll )
          )
        }

        if ( this._config.btnSelectAll ) {
          $inputGroup
            .append(
              $('<div>', {
                class: ClassName.INPUT_GROUP_APPEND
              })
            .append( this.els.btnSelectAll )
          )
        }

        $inputGroup
          .append(
            $('<div>', {
              class: ClassName.INPUT_GROUP_APPEND
            })
            .append( this.els.btnSelect )
          )

        $dropdown
          .append( $inputGroup );
      }
      else if ( this._hasButtons ) {
        let $btnGroup = $('<div>', {
          class: ClassName.BTN_GROUP
        })

        if ( this._config.btnDeselectAll ) {
          $btnGroup.append( this.els.btnDeselectAll )
        }

        if ( this._config.btnSelectAll ) {
          $btnGroup.append( this.els.btnSelectAll )
        }

        $btnGroup
          .append(
            $('<div>', {
              class: ClassName.BTN_GROUP
            })
            .append( this.els.btnSelect )
          )

        $dropdown.append( $btnGroup );
      }
      else {
        $dropdown.append( this.els.btnSelect )
      }

      return $dropdown
    }

    _buildDropdownMenu() {
      var $dropdownMenu = $('<div>', {
        class: ClassName.MENU,
        'aria-labelledby': this.ids.dropdownButtonId
      });
      if ( this._config.maxHeight ) {
        $dropdownMenu
          .css({
            'height': 'auto',
            'max-height': this._config.maxHeight,
            'overflow-x': 'hidden'
          });
      }
      if ( this._config.search ) {
        $dropdownMenu.addClass( ClassName.ALIGNMENT_RIGHT )
      }
      return $dropdownMenu;
    }

    _buildDropdownItemsContainer() {
      return $('<div>');
    }

    _buildDropdownItemNoResults() {
      var _ = this;
      return $( '<span>', {
        class: ClassName.ITEM + ' ' + 'text-muted no-results',
        text: _._config.textNoResults
      }).hide();
    }

    _buildDropdownItems() {
      let s = 0 // Sort index
      let o = 0 // Option index
      let $items = $()
      let $optgroups = $( this._element ).find('optgroup')
      if ( $optgroups.length ) {
        $optgroups.each( ( index, element ) => {
          $items = $items.add(
            this._buildDropdownHeader( $( element ).attr('label') )
            .data('index', s )
          )
          s = this._incrementIndex( s );
          $( element ).find('option').each( ( index, element ) => {
            $( element ).data('option', o )
            $items = $items.add(
              this._buildDropdownItem( $( element ) )
              .data('index', s )
              .data('option', o )
            )
            s = this._incrementIndex( s );
            o++
          })
        })
      } else {
        $( this._element ).find('option').each( ( index, element ) => {
          $( element ).data('option', o )
          $items = $items.add(
            this._buildDropdownItem( $( element ) )
            .data('index', s )
            .data('option', o)
          )
          s = this._incrementIndex( s )
          o++
        })
      }
      if ( this._config.search ) {
        $items = $items.add( this.els.dropdownItemNoResults );
      }
      return $items;
    }

    _incrementIndex( index ) {
      var _ = this;
      _._indexes.push( index.toString() );
      index++;
      return index;
    }

    _buildDropdownHeader( text ) {
      return $( '<h6>', {
        class: 'dropdown-header',
        text: text
      });
    }

    _buildDropdownItem( $option ) {
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

    _buildBadgeContainer() {
      return $('<div>', {
        'class' : this._config.classBadgeContainer
      })
    }

    /**
     * Build badge.
     * @param  {Integer} option Option index number
     * @param  {String} text
     * @return {Object} jQuery object
     */
    _buildBadge( option, text ) {
      return $('<span>',
        {
          'class' : this._config.classBadge
        })
        .text( text + ' ' )
        .append(
          $('<a>', {
              'href' : '#'
            })
            .html( this._config.htmlBtnBadgeRemove )
            .data( 'option', option )
        )
    }

    /**
     * Boolean: Bootstrap Dropdown visible.
     * @return {boolean}
     */
    _dropdownActive() {
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
    _isOption( $item ) {
      var attr = $item.data('option');
      if (typeof attr !== typeof undefined && attr !== false) {
        return true;
      }
      return false;
    }

    _externalFeedback() {
      this._setButtonText()
      if ( this._config.badges ) {
        this._setBadges()
      }
    }

    /**
     * Set button text.
     * @return {undefined}
     */
    _setButtonText() {
      let btnText
      let selected = $( this._element ).val()
      if ( selected.length < 1 ) {
        btnText = this._config.textNoneSelected
      }
      else if ( selected.length <= this._config.maxListLength ) {
        btnText = this._getTextValues().join(", ")
      }
      else {
        btnText = this._config.textMultipleSelected
        btnText = btnText.replace( Keyword.COUNT_SELECTED, selected.length )
      }

      this.els.btnSelect.text( btnText )
    }

    _setBadges( selected ) {
      let badges = $()
      let $selected = $( this._element ).find('option:selected')
      $selected.each( ( index, element ) => {
        badges = badges.add( this._buildBadge( $( element ).data('option'), $( element ).text() ) )
      })
      this.els.badgeContainer
        .html('')
        .append( badges )
    }

    _getText( value ) {
      return $( this._element )
        .find("option[value='" + value +  "']")
        .first()
        .text()
    }

    _getTextValues() {
      return $( this._element )
        .find('option:selected')
        .map(function (i, element) {
          return $(element).text()
        })
        .get()
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
    _refresh() {
      this._hoverRemove();
      this.els.dropdownItemNoResults.hide();
      this._sortReset();
      this._showInitialControls();
    }

    _hide( results ) {
      var notResults = $(this._indexes).not(results).get();
      $.each( notResults, ( index, value ) => {
        this._dropdownItemByIndex( value ).hide();
      });
      this.els.btnSelect.dropdown('update')
    }

    _dropdownItemByIndex( s ) {
      return this.els.dropdownItems.filter( ( index, element ) => {
        return $( element ).data('index') == s
      })
    }

    _dropdownItemByOption( o ) {
      return this.els.dropdownItems.filter( ( index, element ) => {
        return $( element ).data('option') == o
      })
    }

    _hideInitialControls() {
      var _ = this;
      _.els.controlSelected.hide();
    }

    _showInitialControls( prepend ) {
      prepend = (typeof prepend !== typeof undefined ) ?  prepend : false;
      var _ = this;
      if ( prepend ) {
        _.els.controlSelected.prependTo( _.els.dropdownMenu );
      }
      _.els.controlSelected.show();
    }

    _refreshInitialControls() {
      var _ = this;
      var $el = $( _._element );
      if ( !$el.val() || $el.val().length == 0 ) {
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
    _hoverSet( index ) {
      var _ = this;
      _.els.dropdownOptions.removeClass( ClassName.HOVER );
      if ( typeof index === typeof undefined ) {
        var $item = _.els.dropdownOptions.first();
      } else {
        var $item = _._dropdownItemByIndex( index );
      }
      _._hoverItem = $item;
      $item.addClass( ClassName.HOVER );
    }

    /**
     * Move the hover class up.
     *
     * @return {undefined}
     */
    _hoverUp() {
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
     * @return {undefined}
     */
    _hoverDown() {
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
     * @return {undefined}
     */
    _hoverRemove() {
      var _ = this;
      _.els.dropdownItems.removeClass( ClassName.HOVER ).show();
    }

    /**
     * Sort: Reset sort order.
     * @return {undefined}
     */
    _sortReset() {
      var _ = this;
      var i;
      for ( i = _.els.dropdownItems.length; i >= 0; i--) {
        _._dropdownItemByIndex( i ).prependTo( _.els.dropdownItemsContainer );
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
    _reorder( indexes ) {
      var _ = this;
      _.els.dropdownItemNoResults.hide();
      if ( typeof indexes === typeof undefined || indexes.length == 0) {
        _.els.dropdownItemNoResults.show();
        return;
      }
      var indexesReversed = indexes.slice(0); // Clone
      indexesReversed = indexesReversed.reverse();
      $.each( indexesReversed, function( index, value ) {
        _._dropdownItemByIndex( value ).prependTo( _.els.dropdownItemsContainer );
      });
      _._hideInitialControls();
    }

    /**
     * Sort: Move selected items to the top.
     * @return {undefined}
     */
    _sortSelected() {
      var _ = this;
      var $el = $( _._element );
      _.els.dropdownOptions.removeClass( ClassName.HOVER );
      $( _.els.dropdownMenu.find('.active').get().reverse() ).each( function(){
        $( this ).prependTo( _.els.dropdownItemsContainer );
      });
      _._showInitialControls( true );
      _.resetScroll();
    }

    _preventDropdownHide() {
      if ( this._dropdownActive() ) {
        this.els.dropdown.one('hide.bs.dropdown', function ( event ) {
          event.preventDefault()
        })
      }
    }

    /**
     * Helper: Reset scroll.
     *
     * Scroll the dropdown menu to the top.
     * @return {[type]} [description]
     */
    _resetScroll() {
      this.els.dropdownMenu.animate({
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
    _classListToSelector( classList ) {
      let selector = classList
      if ( classList.length ) {
        let classes = classList.split(/\s+/)
        selector = '.' + classes.join('.')
      }
      return selector;
    }

    _alignLeft() {
      //this.els.dropdownMenu.css('width', '100%');
      //this.els.dropdownMenu.removeClass( ClassName.ALIGNMENT_RIGHT );
      //this.els.btnSelect.dropdown('update');
    }

    _alignRight() {
      //this.els.dropdownMenu.css('width', 'auto');
      //this.els.dropdownMenu.addClass( ClassName.ALIGNMENT_RIGHT );
      //this.els.btnSelect.dropdown('update');
    }

    /**
     * Helper: Compare two arrays.
     *
     * @see https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
     */
    _arraysEqual( a, b ) {
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

   $(window).on(Event.LOAD_DATA_API, () => {
     $(Selector.DATA_ROLE).each(function () {
       const $selectDropdown = $(this)
       SelectDropdown._jQueryInterface.call($selectDropdown, $selectDropdown.data())
     })
   })

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
