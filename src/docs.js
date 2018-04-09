require('./scss/docs.scss');
import $ from 'jquery';
import 'bootstrap';
import hljs from 'highlight.js';
hljs.initHighlightingOnLoad();
import SelectDropdown from './js/bootstrap-select-dropdown.js';

$(document).ready(function(){
  $('#version').text('v' + '[AIV]{version}[/AIV]')
  $.each( [
    "select#demo_overview_icons_badges",
    "select#demo_options_html"
  ], function( index, value ){
    $( value ).selectDropdown({
      'maxListLength': 0,
      'badges': true,
      'htmlBtnClear': '<svg class="ion"><use xlink:href="#ion-close"></use></svg>',
      'htmlBtnDeselectAll': '<svg class="ion"><use xlink:href="#ion-close-circled"></use></svg>',
      'htmlBtnSelectAll': '<svg class="ion"><use xlink:href="#ion-checkmark-circled"></use></svg>',
      'htmlBtnBadgeRemove': '<svg class="ion"><use xlink:href="#ion-close"></use></svg>'
    });
  });
});
