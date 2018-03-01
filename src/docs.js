require('./scss/docs.scss');
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import Fuse from 'fuse.js';
window.Fuse = Fuse;
import hljs from 'highlight.js';
hljs.initHighlightingOnLoad();
require('./js/bootstrap-select-dropdown.js');
var demoIds = [
  'demo_select',
  'demo_select_optgroups',
  'demo_multiselect',
  'demo_multiselect_optgroups'
];
$(document).ready(function(){
  $("select[data-role='dropdown']").each( function(){
    $(this).selectDropdown();
  });
  $.each( demoIds, function( index, value ){
    $('#' + value ).selectDropdown({
      //hideSelect: false
    });
  });
  $("select#demo_select_htmlclear").selectDropdown({
    'htmlClear': '<svg class="ion"><use xlink:href="#ion-close-circled"></use></svg>'
  });
});
