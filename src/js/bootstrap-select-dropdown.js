(function (factory) {
  if(typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(require("jquery"), window, document);
  } else {
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {
  // Assign index numbers to each instance of the plugin
  var index = 0;

  // Create the defaults once
  var pluginName = "selectDropdown",
    defaults = {
      // Text.
      textNoneSelected: "None selected",
      textMultipleSelected: "Multiple selected",

      // Behaviour
      maxListLength: 4, // Maximum number of <option> text() values to display within the button.
      hideSelect: true, // Hide the select element.
      multiselectStayOpen: true, // Keep dropdown open on interaction for multiselects.
      search: true,
      observeDomMutations: false,
      maxHeight: '300px', // Make the dropdown scrollable if beyond this height. Set as false to disable.
      appendSelectedList: true,

      // Classes
      classDropdown: "dropdown",
      classBtn: "btn btn-primary",
      classMenu: "dropdown-menu",
      classItem: "dropdown-item",

    };

  // The actual plugin constructor
  function Plugin ( element, options, index ) {
    this.index = index;
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend( Plugin.prototype, {
    init: function() {
      var _ = this; // Deep reference to this.
      var $el = $( _.element );
      _.prefix = 'bsd' + _.index + '-'; // Prefix for unique labelling.

      // Properties: Data.
      _.data = {};
      _.data.multiselect = false;
      _.data.preventHideDropdown = false;
      var attrMultiple = $el.attr('multiple');
      if ( typeof attrMultiple !== typeof undefined && attrMultiple !== false ) {
        _.data.multiselect = true;
      }
      _.data.status = 'initial';
      _.data.indexes = [];

      // Properties: IDs.
      _.ids = {};
      _.ids.dropdownContainerId = _.prefix + 'container';
      _.ids.dropdownButtonId = _.prefix + 'button';
      _.ids.searchControlId = _.prefix + 'search';
      _.ids.dropdownItemDeselect = _.prefix + 'deselect';
      _.ids.dropdownItemShowSelected = _.prefix + 'selected';

      // Properties: Classes.
      _.classes = {};
      _.classes.dropdownOption = _.prefix + 'option';

      // Properties: Selectors.
      _.selectors = {};
      _.selectors.dropdownOptions = 'a.' + _.classes.dropdownOption;
      _.selectors.dropdownItemDeselect = 'a#' + _.ids.dropdownItemDeselect;
      _.selectors.dropdownItemShowSelected = 'a#' + _.ids.dropdownItemShowSelected;

      // Properties: Elements.
      _.els = {};
      _.els.button = _.buildButton();
      if ( _.settings.search ) {
        _.els.searchControl = _.buildSearchControl();
        _.els.searchContainer = _.buildSearchContainer();
      }
      _.els.controlDeselect = _.buildDeselectAll();
      _.els.controlSelected = _.buildShowSelected()
      _.els.dropdownMenu = _.buildDropdownMenu();
      _.els.dropdownMenuItems = _.buildDropdownMenuItems();
      _.els.dropdownMenuOptions = _.els.dropdownMenuItems.filter( function() {
        var attr = $( this ).data('option');
        if (typeof attr !== typeof undefined && attr !== false) {
          return true;
        }
        return false;
      });

      // Observe the occurences of the following.
      // _.els.dropdownMenu.find( _.selectors.dropdownItems );
      // Why do we need to find tham again? Dows jQuery not store the reference when we append?

      // Initialise Search.
      if ( _.settings.search ) {
        var haystack = [];
        var options = {
          keys: ['text'],
          id: 'index'
        };
        _.els.dropdownMenuOptions.each( function( index ) {
          haystack[ index ] = {
            index : $( this ).data('index'),
            text : $( this ).text()
          };
        });
        _.els.searchControl.on('keyup', function() {
          var s = $(this).val();
          var results = null;
          if ( $.trim( s ) == '' ) {
            _.refresh();
            return;
          } else {
            var fuse = new Fuse( haystack, options );
            results = fuse.search( $(this).val() );
          }
          if ( results ) {
            // Continue.
          } else {
            _.refresh();
            return;
          }
          //_.sort();
          _.hide( results );
          _.reorder( results );
        });
      }

      // Handle cut and paste.
      _.els.searchControl.bind({
          paste : function(){
            $(this).trigger('keyup');
          },
          cut : function(){
            $(this).trigger('keyup');
          }
      });

      // Build.
      _.setButtonText();
      var $dropdown = _.buildDropdown();
      if ( _.settings.search ) {
        $dropdown
          .append( _.els.searchContainer )
          .find('.input-group-append')
          .first()
          .append( _.els.button  );
          _.els.dropdownMenu.addClass('dropdown-menu-right');
      } else {
        $dropdown
          .append( _.els.button );
      }
      $dropdown
        .append( _.els.dropdownMenu );
      _.els.dropdownMenu
        .append( _.els.dropdownMenuItems );
      $el.after( $dropdown );
      if ( _.settings.hideSelect ) {
        $el.hide();
      }

      // Assign click handler: Select item.
      _.els.dropdownMenuOptions.on('click', function( event ){
        event.preventDefault();
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

      // Assign 'Enter' key listener for search.
      _.els.searchControl.keypress(function(e) {
        if(e.which == 13) {
          _.toggle( _.els.dropdownMenu.find('.hover').first() );
        }
      });

      // Prevent dropdown hide on interaction for multiselect.
      if ( _.data.multiselect && _.settings.multiselectStayOpen ) {
        $dropdown.on('hide.bs.dropdown', function ( event ) {
          if ( _.data.preventHideDropdown ) {
            event.preventDefault();
            _.data.preventHideDropdown = false;
          }
        });
      }

      // On search focus: Toggle dropdown.
      // - Can reliance on setTimeout be removed?
      // - Should we depend on an aria attribute for plugin logic?
      if ( _.settings.search ) {
        _.els.searchControl.on('focusin', function(){
          if ( _.els.button.attr('aria-expanded') == 'false' ) {
            _.els.button.dropdown('toggle');
            setTimeout(function(){
              _.els.searchControl.focus();
            }, 1);
          }
        });
      }

      _.refreshInitialControls();

      // DOM mutation observer
      if ( _.settings.observeDomMutations ) {
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
    },
    buildDropdown: function() {
      var _ = this;
      return $dropdown = $('<div>', {
        id : _.ids.dropdownContainerId,
        class : _.settings.classDropdown
      });
    },
    buildButton: function() {
      var _ = this;
      return $('<button>', {
        class: _.settings.classBtn + ' dropdown-toggle',
        type: 'button',
        id: _.ids.dropdownButtonId,
        'data-toggle': 'dropdown',
        'data-target': '#' + _.ids.dropdownContainerId,
        'aria-haspopup': 'true',
        'aria-expanded': 'false'
      });
    },
    buildDropdownMenu: function() {
      var _ = this;
      var $dropdownMenu = $('<div>', {
        class: _.settings.classMenu,
        'aria-labelledby': _.ids.dropdownButtonId
      });
      if ( _.settings.maxHeight ) {
        $dropdownMenu
          .css({
            'height': 'auto',
            'max-height': _.settings.maxHeight,
            'overflow-x': 'hidden'
          });
      }
      return $dropdownMenu;
    },
    buildSearchControl: function() {
      var _ = this;
      return $input = $('<input>', {
        type: 'text',
        class: 'form-control',
        placeholder: 'Search',
        'aria-label': 'Search',
        'aria-describedby': _.ids.searchControlId
      });
    },
    buildSearchContainer: function() {
      var _ = this;
      var $searchContainer = $('<div>', {
        class: 'input-group'
      });
      var $buttonContainer = $('<div>', {
        class: 'input-group-append'
      });
      return $searchContainer
        .append( _.els.searchControl )
        .append( $buttonContainer );
    },
    buildDropdownMenuItems: function() {
      var _ = this;
      var $el = $( _.element );
      var s = 0; // Sort index
      var o = 0; // Option index
      //var $items = $();
      var $items = _.els.controlDeselect.data('index', s );
      s = _.incrementIndex( s );
      $items = $items.add( _.els.controlSelected.data('index', s ) );
      s = _.incrementIndex( s );
      var $optgroups = $el.find('optgroup');
      if ( $optgroups.length ) {
        $optgroups.each( function(){
          $items = $items.add( _.buildDropdownHeader( $( this ).attr('label') ).data('index', s ) );
          s = _.incrementIndex( s );
          $( this ).find('option').each( function() {
            $items = $items.add( _.buildDropdownOption( $( this ) ).data('index', s ).data('option', o) );
            s = _.incrementIndex( s );
            o++;
          });
        });
      } else {
        $el.find('option').each( function( index, value ) {
          $items = $items.add( _.buildDropdownOption( $( this ) ).data('index', s ).data('option', o) );
          s = _.incrementIndex( s );
          o++;
        });
      }
      return $items;
    },
    incrementIndex: function( index ) {
      var _ = this;
      _.data.indexes.push( index.toString() );
      index++;
      return index;
    },
    buildDropdownHeader: function( text ) {
      return $( '<h6>', {
        class: 'dropdown-header',
        text: text
      });
    },
    buildDropdownOption: function( $option ) {
      var _ = this;
      var $dropdownOption = $( '<a>', {
        href: '#',
        class: _.settings.classItem + ' ' + _.classes.dropdownOption,
        text: $option.text()
      });
      if ( $option.is(':selected') ) {
        $dropdownOption.addClass('active');
      }
      return $dropdownOption;
    },
    buildDeselectAll: function() {
      var _ = this;
      var $deselectItem = $('<a>', {
        href: '#',
        id: _.ids.dropdownItemDeselect,
        class:  _.settings.classItem,
        text: 'Deselect all'
      });
      return $deselectItem;
    },
    buildShowSelected: function() {
      var _ = this;
      var $showSelectedItem = $('<a>', {
        href: '#',
        id: _.ids.dropdownItemShowSelected,
        class:  _.settings.classItem,
        text: 'Show selected'
      });
      return $showSelectedItem;
    },
    toggle: function( $dropdownItem ) {
      var _ = this;
      var $el =  $( _.element );
      if ( _.data.multiselect ) {
        _.data.preventHideDropdown = true;
      }
      var itemIndex = $dropdownItem.data('option');
      var $option = $el.find('option').eq( itemIndex );
      if ( $option.is(':selected') ) {
        $option.prop('selected', false);
        $dropdownItem.removeClass('active');
      }
      else {
        if ( !_.data.multiselect ) {
          _.els.dropdownMenuOptions.removeClass('active');
        }
        $option.prop('selected', true);
        $dropdownItem.addClass('active');
      }
      _.setButtonText();
      _.refreshInitialControls();
    },
    deselectAll: function() {
      var _ = this;
      var $el =  $( _.element );
      _.els.dropdownMenuOptions.each( function(){
        _.deselect( $( this ) );
      });
      if ( _.data.status == 'sort-selected' ) {
        _.refresh();
      }
    },
    deselect: function( $dropdownItem ){
      var _ = this;
      var $el =  $( _.element );
      var itemIndex = $dropdownItem.data('option');
      var $option = $el.find('option').eq( itemIndex );
      if ( $option.is(':selected') ) {
        _.toggle( $dropdownItem );
      }
    },
    setButtonText: function() {
      var _ = this;
      var $el = $( _.element );
      var $btn = _.els.button;
      var selected = $el.val();
      if ( selected.length < 1 ) {
        $btn.text( _.settings.textNoneSelected );
      }
      else if ( selected.length <= _.settings.maxListLength ) {
        var textValues = $el
          .find('option:selected')
          .map(function (i, element) {
            return $(element).text();
          })
          .get();
        $btn.text( textValues.join(", ") );
      }
      else {
        $btn.text( _.settings.textMultipleSelected );
      }
    },
    refresh: function() {
      var _ = this;
      _.data.status = 'initial';
      _.els.dropdownMenuOptions.removeClass('hover').show();
      _.sortReset();
      _.showInitialControls();
    },
    hide: function( results ) {
      var _ = this;
      var notResults = $(_.data.indexes).not(results).get();
      _.els.dropdownMenuOptions.show().removeClass('hover');
      $.each( notResults, function( index, value ) {
        _.dropdownItemByIndex( value ).hide();
      });
      _.els.dropdownMenuOptions.each( function () {
        if ($(this).css('display') != 'none') {
          $(this).addClass('hover');
          return false;
        }
      });
      _.els.button.dropdown('update');
    },
    dropdownItemByIndex: function( index ) {
      var _ = this;
      return _.els.dropdownMenuItems.filter( function(){
        return $(this).data('index') == index;
      });
    },
    reorder: function( indexes ) {
      var _ = this;
      if ( indexes === undefined || indexes.length == 0) {
        return;
      }
      indexes = indexes.reverse();
      $.each( indexes, function( index, value ) {
        _.els.dropdownMenu.find( '[data-index="' + value + '"]' ).prependTo( _.els.dropdownMenu );
      });
    },
    hideInitialControls: function() {
      var _ = this;
      _.els.controlDeselect.hide();
      _.els.controlSelected.hide();
    },
    showInitialControls: function( prepend ) {
      prepend = (typeof prepend !== 'undefined') ?  prepend : false;
      var _ = this;
      if ( prepend ) {
        _.els.controlSelected.prependTo( _.els.dropdownMenu );
        _.els.controlDeselect.prependTo( _.els.dropdownMenu );
      }
      _.els.controlSelected.show();
      _.els.controlDeselect.show();
    },
    refreshInitialControls: function() {
      var _ = this;
      var $el = $( _.element );
      if ( !$el.val() || $el.val().length == 0 ) {
        _.els.controlDeselect.addClass('disabled');
        _.els.controlSelected.addClass('disabled');
      } else {
        _.els.controlDeselect.removeClass('disabled');
        _.els.controlSelected.removeClass('disabled');
      }
    },
    sortReset: function() {
      var _ = this;
      for ( i = _.els.dropdownMenuItems.length; i >= 0; i--) {
        _.dropdownItemByIndex( i ).prependTo( _.els.dropdownMenu );
      }
    },
    sortSelected: function() {
      var _ = this;
      var $el = $( _.element );
      _.els.dropdownMenuOptions.removeClass('hover');
      $( _.els.dropdownMenu.find('.active').get().reverse() ).each( function(){
        $( this ).prependTo( _.els.dropdownMenu );
      });
      _.showInitialControls( true );
      _.data.status = 'sort-selected';
      _.els.dropdownMenu.animate({
          scrollTop: 0
      }, 500);
    },
    classListToSelector: function( classList ) {
      var selector = classList;
      if ( classList.length ) {
        var classes = classList.split(/\s+/);
        selector = '.' + classes.join('.');
      }
      return selector;
    }
  } );

  $.fn[ pluginName ] = function( options ) {
    return this.each( function() {
      if ( !$.data( this, "plugin_" + pluginName ) ) {
        index++;
        $.data( this, "plugin_" +
          pluginName, new Plugin( this, options, index ) );
      }
    } );
  };
}));
