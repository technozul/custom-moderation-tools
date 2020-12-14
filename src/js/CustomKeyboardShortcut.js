/**
* custom keyboard shortcut moderation panel
* add keyboard shortcut to perform some task
*/


// import 'jquery.hotkeys'; // import jquery.hotkeys library
// import {Helpers} from './modules/Helpers.js'; // import module Helpers
import 'mousetrap'; // mousetrap

export class CustomKeyboardShortcut { // custom keyboard shortcut class
   constructor() { // cosntructor
      this.init();
   }

   init() { // init shortcut keyboard
      /*Mousetrap.bind('ctrl+enter', function () {
         $('.active .acceptAd').click(); // trigger approved button to click
      }, 'keyup');

      Mousetrap.bind('ctrl+.', function () {
          $('.active .wrongPrice').click(); // trigger invalid price button to click
      }, 'keyup');

      /*Mousetrap.bind('z', function () {
          $('.active .changeCategory').click(); // trigger change category button to click
      }, 'keyup');

      Mousetrap.bind('`', function () {
          $('.active .adTitle').dblclick(); // trigger edit title
      }, 'keyup');

      Mousetrap.bind('d', function () {
         $('.active .adDescription').dblclick(); // trigger edit description
      }, 'keyup');*/

      /*Mousetrap.bind(['q', 'w', 'e'], function (e) { // shortcut adpage, usercard, adcard
         let key = e.key.toLowerCase();

         $('.active .adTitle')
            .next()
            .next()
            .find('a')
            .each(function () {
               let $this = $(this);
               let text = $this.text().replace(/\W/g, '');
               let url = $this.attr('href');



               if (text == 'ad page' && key == 'q') {
                  window.open(url, '_blank');
               } else if (text == 'user card' && key == 'w') {
                  window.open(url, '_blank');
               } else if (text == 'ad card' && key == 'e') {
                  window.open(url, '_blank');
               }
            });
      }, 'keyup');

      $(document).bind('keyup', function (e) { // escape from input or textarea
         let key = e.key.toLowerCase();

         if (key == 'escape') {
            $(':focus').blur();
         }
      });*/
      Mousetrap
      // bind shortcut
      Mousetrap.bind('ctrl+enter', function () {
          $('.active .acceptAd').click(); // trigger click approve button
      }, 'keyup')

      Mousetrap.bind('ctrl+.', function () {
          $('.active .wrongPrice').click(); // trigger click invalid price
      }, 'keyup')

      Mousetrap.bind('z', function () {
          $('.active .changeCategory').click(); // open change category menu
      }, 'keyup')

      Mousetrap.bind('`', function () {
          $('.active .adTitle').dblclick(); // edit title
      }, 'keyup')

      Mousetrap.bind('d', function () {
          $('.active .adDescription').dblclick(); // edit description
      }, 'keyup');


      Mousetrap.bind(['q', 'w', 'e'], function (e) {
          var href = '';
          var target = $('.active .head');

          if (e.key === 'q') {
             href = target.find('a:contains("ad page")').attr('href');
          } else if (e.key === 'w') {
             href = target.find('a:contains("user card")').attr('href');
          } else if (e.key === 'e') {
             href = target.find('a:contains("ad card")').attr('href');
          }

          window.open(href, '_blank');
      }, 'keyup');

      $('body').keyup(function (e) {
          if (e.keyCode == 27) { //escape key pressed
             $('input:focus, textarea:focus').blur();
          }
      });
  };

      // let $document = $(document); // document
      //
      // $document.bind('keyup', 'ctrl+return', function () {
      //    $('.active .acceptAd').click(); // trigger approved button to click
      // });
      //
      // $document.bind('press', 'ctrl+.', function () {
      //    $('.active .wrongPrice').click(); // trigger invalid price button to click
      // });
      //
      // $document.bind('keyup', 'z', function () {
      //    $('.active .changeCategory').click(); // trigger change category button to click
      // });
      //
      // // $document.bind('keyup', '0', function () {
      // //    $('.active .remove_53').click(); // trigger hyperlink button to click
      // // });
      //
      // $document.bind('keyup', '`', function () {
      //    $('.active .adTitle').dblclick(); // trigger edit title
      // });
      //
      // $document.bind('keyup', 'd', function () {
      //    $('.active .adDescription').dblclick(); // trigger edit description
      // });
      //
      // let $input = $('input, textarea, *[contenteditable="true"]');
      // $input.bind('keyup', 'esc', function () { // trigger close edit box
      //    $(':focus').blur();
      // });
   }
