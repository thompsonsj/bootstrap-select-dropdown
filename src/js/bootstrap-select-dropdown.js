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
      var _ = this; //Deep reference to this.
      var $el = $( _.element );

      // Data.
      $el.data( _._name + 'Multiselect', false );
      $el.data( _._name + 'PreventHideDropdown', false );
      var attrMultiple = $el.attr('multiple');
      if ( typeof attrMultiple !== typeof undefined && attrMultiple !== false ) {
        $el.data( _._name + 'Multiselect', true );
      }

      // Elements.
      _.elements = {}
      _.elements.dropdownContainerId = _._name + 'Container' + _.index;
      _.elements.dropdownButtonId = _._name + 'Button' + _.index;
      _.elements.searchControlId = _._name + 'Search' + _.index;
      _.elements.button = _.buildButton();
      _.elements.dropdownItemsSelector = 'a' + _.classListToSelector( _.settings.classItem );
      if ( _.settings.search ) {
        _.elements.searchControl = _.buildSearchControl();
        _.elements.searchContainer = _.buildSearchContainer();
      }
      _.elements.dropdownMenu = _.buildDropdownMenu();
      _.elements.dropdownMenuItems = _.elements.dropdownMenu.find( _.elements.dropdownItemsSelector );

      // Initialise FuzzySet.
      if ( _.settings.search ) {
        _.fuzzySet = FuzzySet();
        _.elements.dropdownMenuItems.each( function(){
          _.fuzzySet.add( $(this).text() );
        });
        _.elements.searchControl.on('keyup', function(){
          _.elements.dropdownMenuItems.data('sort', 0);
          var s = $(this).val();
          var results = null;
          if ( s != '' ) {
            results = _.fuzzySet.get( $(this).val() );
          }
          if ( results ) {
            $.each( results, function( index, value ) {
              _.elements.dropdownMenuItems
                .filter(function(){
                  return $(this).text() === value[1];
                })
                .data('sort', value[0] );
            });
          }
          _.sort();
        });
      }

      // Build.
      _.setButtonText();
      var $dropdown = _.buildDropdown();
      if ( _.settings.search ) {
        $dropdown
          .append( _.elements.searchContainer )
          .find('.input-group-append')
          .first()
          .append( _.elements.button  );
        _.elements.dropdownMenu.addClass('dropdown-menu-right');
      } else {
        $dropdown
          .append( _.elements.button );
      }
      $dropdown
        .append( _.elements.dropdownMenu );
      $el.after( $dropdown );
      if ( _.settings.hideSelect ) {
        $el.hide();
      }

      // Assign click handler.
      $dropdown.on('click', _.elements.dropdownItemsSelector, function( event ){
        event.preventDefault();
        if ( $el.data( _._name + 'Multiselect') ) {
          $el.data( _._name + 'PreventHideDropdown', true );
        }
        var itemIndex = $dropdown.find( _.elements.dropdownItemsSelector ).index( $(this) );
        var $option = $el.find('option').eq(itemIndex);
        if ( $option.is(':selected') ) {
          $option.prop('selected', false);
          $(this).removeClass('active');
        }
        else {
          if ( !$el.data( _._name + 'Multiselect' ) ) {
            _.elements.dropdownMenu.find( _.elements.dropdownItemsSelector ).removeClass('active');
          }
          $option.prop('selected', true);
          $(this).addClass('active');
        }
        _.setButtonText();
      });

      // Prevent dropdown hide on interaction for multiselect.
      if ( $el.data( _._name + 'Multiselect' ) && _.settings.multiselectStayOpen ) {
        $dropdown.on('hide.bs.dropdown', function ( event ) {
          if ( $el.data( _._name + 'PreventHideDropdown' ) ) {
            event.preventDefault();
            $el.data( _._name + 'PreventHideDropdown', false );
          }
        });
      }

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
        id : _.elements.dropdownContainerId,
        class : _.settings.classDropdown
      });
    },
    buildButton: function() {
      var _ = this;
      return $('<button>', {
        class: _.settings.classBtn + ' dropdown-toggle',
        type: 'button',
        id: _.elements.dropdownButtonId,
        'data-toggle': 'dropdown',
        'data-target': '#' + _.elements.dropdownContainerId,
        'aria-haspopup': 'true',
        'aria-expanded': 'false'
      });
    },
    buildDropdownMenu: function() {
      var _ = this;
      var $dropdownMenu = $('<div>', {
        class: _.settings.classMenu,
        'aria-labelledby': _.elements.dropdownButtonId
      });
      $.each( _.buildDropdownMenuItems(), function(){
        $dropdownMenu.append( $(this) );
      });
      return $dropdownMenu;
    },
    buildSearchControl: function() {
      var _ = this;
      return $input = $('<input>', {
        type: 'text',
        class: 'form-control',
        placeholder: 'Search',
        'aria-label': 'Search',
        'aria-describedby': _.elements.searchControlId
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
        .append( _.elements.searchControl )
        .append( $buttonContainer );
    },
    buildDropdownMenuItems: function() {
      var _ = this;
      var $el = $( _.element );
      var $items = [];
      var $optgroups = $el.find('optgroup');
      if ( $optgroups.length ) {
        $optgroups.each( function(){
          $items.push( _.buildDropdownHeader( $(this).attr('label') ) );
          $(this).find('option').each(function(){
            $items.push( _.buildDropdownItem( $(this) ) );
          });
        });
      } else {
        $el.find('option').each(function(){
          $items.push( _.buildDropdownItem( $(this) ) );
        });
      }
      return $items;
    },
    buildDropdownHeader: function( text ) {
      return $( '<h6>', {
        class: 'dropdown-header',
        text: text
      });
    },
    buildDropdownItem: function( $option ) {
      var _ = this;
      var $dropdownItem = $( '<a>', {
        href: '#',
        class: _.settings.classItem,
        text: $option.text()
      });
      if ( $option.is(':selected') ) {
        $dropdownItem.addClass('active');
      }
      if ( _.settings.search ) {
        $dropdownItem.data('sort', 0);
      }
      return $dropdownItem;
    },
    setButtonText: function() {
      var _ = this;
      var $el = $( _.element );
      var $btn = _.elements.button;
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
      var items = _.buildDropdownMenuItems();
      _.elements.dropdownMenu.html('');
      $.each( _.buildDropdownMenuItems(), function(){
        _.elements.dropdownMenu.append( $(this) );
      });
    },
    sort: function() {
      //console.log('sort');
      var _ = this;
      _.elements.dropdownMenuItems.each( function() {
        //console.log( $(this).data() );
      });
      //_.elements.dropdownMenu.html('');
      var sorted = _.elements.dropdownMenuItems.sort( function( a, b ) {
            //console.log( $(a).data('sort') + ' ' + $(b).data('sort') );
           return parseFloat( $(a).data('sort') ) > parseFloat( $(b).data('sort') );
      });
      _.elements.dropdownMenu.html('').append( sorted );

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
