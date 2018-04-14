require('./scss/docs.scss');
import $ from 'jquery';
import 'bootstrap';
import hljs from 'highlight.js';
hljs.initHighlightingOnLoad();
import SelectDropdown from './js/bootstrap-select-dropdown.js';

$(document).ready(function(){
  $('#version').text('v' + '[AIV]{version}[/AIV]')
  $( "select#demo_overview_icons_badges" ).selectDropdown({
    'maxListLength': 4,
    'badges': false,
    'selectButtons': true,
    'clear': true,
    'htmlClear': '<svg class="ion"><use xlink:href="#ion-close"></use></svg>',
    'htmlDeselectAll': '<svg class="ion"><use xlink:href="#ion-close-circled"></use></svg>',
    'htmlSelectAll': '<svg class="ion"><use xlink:href="#ion-checkmark-circled"></use></svg>'
  });
  $("select#demo_options_html").selectDropdown({
    'selectButtons': true,
    'clear': true,
    'htmlClear': '<svg class="ion"><use xlink:href="#ion-close"></use></svg>',
    'htmlDeselectAll': '<svg class="ion"><use xlink:href="#ion-close-circled"></use></svg>',
    'htmlSelectAll': '<svg class="ion"><use xlink:href="#ion-checkmark-circled"></use></svg>',
    'htmlBadgeRemove': '<svg class="ion"><use xlink:href="#ion-close"></use></svg>'
  });
});
