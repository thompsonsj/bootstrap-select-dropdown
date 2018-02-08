(function (factory) {
  if(typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(require("jquery"), window, document);
  } else {
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {
  // Assign index numbers to each instance of the plugin
  var index = 0;
  // Append require SVG.
  $('body').append('<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol viewBox="0 0 512 512" id="ion-close-circled"><path d="M256 33C132.3 33 32 133.3 32 257s100.3 224 224 224 224-100.3 224-224S379.7 33 256 33zm108.3 299.5c1.5 1.5 2.3 3.5 2.3 5.6 0 2.1-.8 4.2-2.3 5.6l-21.6 21.7c-1.6 1.6-3.6 2.3-5.6 2.3-2 0-4.1-.8-5.6-2.3L256 289.8l-75.4 75.7c-1.5 1.6-3.6 2.3-5.6 2.3-2 0-4.1-.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6 0-2.1.8-4.2 2.3-5.6l75.7-76-75.9-75c-3.1-3.1-3.1-8.2 0-11.3l21.6-21.7c1.5-1.5 3.5-2.3 5.6-2.3 2.1 0 4.1.8 5.6 2.3l75.7 74.7 75.7-74.7c1.5-1.5 3.5-2.3 5.6-2.3 2.1 0 4.1.8 5.6 2.3l21.6 21.7c3.1 3.1 3.1 8.2 0 11.3l-75.9 75 75.6 75.9z"></path></symbol></svg>');
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
      _.elements.dropdownButtonId = _._name + 'Button' + _.index;
      _.elements.searchControlId = _._name + 'Search' + _.index;
      _.elements.button = _.buildButton();
      _.elements.dropdownItemsSelector = 'a' + _.classListToSelector( _.settings.classItem );
      _.elements.dropdownMenu = _.buildDropdownMenu();

      // Build.
      _.setButtonText();
      var $dropdown = _.buildDropdown();
      $dropdown
        .append( _.elements.button )
        .append( _.elements.dropdownMenu );
      $el.after( $dropdown );
      if ( _.settings.hideSelect ) {
        $el.hide();
      }

      // Assign click handler.
      $dropdown.on('click', _.elements.dropdownItemsSelector, function(){
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
            $dropdown.find( _.elements.dropdownItemsSelector ).removeClass('active');
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
    },
    buildDropdown: function() {
      var _ = this;
      return $dropdown = $('<div>', {class : _.settings.classDropdown });
    },
    buildButton: function() {
      var _ = this;
      return $('<button>', {
        class: _.settings.classBtn + ' dropdown-toggle',
        type: 'button',
        id: _.elements.dropdownButtonId,
        'data-toggle': 'dropdown',
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
      $dropdownMenu.append( _.buildSearchControl() );
      $.each( _.buildDropdownMenuItems(), function(){
        $dropdownMenu.append( $(this) );
      });
      return $dropdownMenu;
    },
    buildSearchControl: function() {
      var _ = this;
      var $searchContainer = $('<div>', {
        class: 'input-group input-group-sm dropdown-item'
      });
      var $input = $('<input>', {
        type: 'text',
        class: 'form-control',
        placeholder: 'Search',
        'aria-label': 'Search',
        'aria-describedby': _.elements.searchControlId
      });
      var $button = $('<div>', {
        class: 'input-group-append'
      }).append(
        $('<button>', {
          class: 'btn btn-outline-secondary',
          type: 'button',
          html: '<svg class="ion ion-close-circled" style="height: 0.875rem; width: 0.875rem;"><use xlink:href="#ion-close-circled"></use></svg>'
        })
      );
      return $searchContainer
        .append( $input )
        .append( $button );
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
        class: _.settings.classItem,
        text: $option.text()
      });
      if ( $option.is(':selected') ) {
        $dropdownItem.addClass('active');
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
