/**
* custom helper module moderation panel
* custom helper module in moderation panel
*/


export class Helpers { // custom helper module class
   constructor(data = {}) { // cosntructor
      this.adData = []; // ad data
      this.data = data; // data param

      // this.jQueryCheck(); // jQuery check
      this.setAdData(); // init ad data
   }

   setAdData() { // init ads data
      let _this = this; // this class
      let $ads = $('.adLI, .duplicateLI'); // ads

      $ads.each(function (idx, ad) { // loop each ad
         let $ad = $(ad); // ad
         let adData = { // ad data
            adElement: $ad, // ad element
            adInfo: $ad.find('.subinfo'), // ad info
            adEmail: ($ad.is('.adLI')) ? $ad.find('.useremail') : $ad.find('.details tr:first td:nth-child(3)'), // ad email
            adCategory: $ad.attr('data-categories_path'), // ad category
            adTitle: ($ad.is('.adLI')) ? $ad.find('.adTitle') : $ad.find('.oryginalTitle, .newTitle'), // ad title
            adDescription: ($ad.is('.adLI')) ? $ad.find('.adDescription') : $ad.find('.duplicateDescription'), // ad description
            adPrice: ($ad.is('.adLI')) ? $ad.find('.label-pricehl') : $ad.find('.wrongPrice').prev(), // ad price
            adTargetKeyword: { // ad target keyword
               processed: false, // is processed ?
               data: [] // data keyword
            }
         };

         _this.adData.push(adData); // push data
      });

      return this; // return this class
   }

   escapeCharacter(text) { // escape character function
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/gi, '\\$&');
   }

   getJsonData(config) { // get json with ajax
      let cb = 'cb' + Math.floor((Math.random() * 100000000) + 1); // create dynamic callback to avoid conflict

      return $.ajax({ // ajax get method with jsonp
         url: config.url, // url to fetch
         dataType: 'jsonp', // data type
         jsonpCallback: cb // callback function
      });
   }

   // jQueryCheck() { // checking jQuery
   //    if (!window.jQuery) { // include jQuery if not exsist
   //       window.$ = window.jQuery = require('jquery');
   //    }
   //
   //    return this; // return this class
   // }

   highlight() { // highlighting keyword
      let _this = this; // this class
      let className = _this.data.highlighterData.className; // className
      let style = _this.data.highlighterData.style; // style
      let adData = _this.adData; // filteredAds

      adData.then(function (result) { // promises data ads
         result.forEach(function (item, i) { // loop each result
            let adData = item; // ad data
            let adTargetKeyword = adData.adTargetKeyword.data || _this.data.spreadsheetData; // ad adTargetKeyword
            let $text = $.merge(adData.adTitle, adData.adDescription); // merge element

            adTargetKeyword.forEach(function (row) { // loop adTargetKeyword
               let commentData = row.gsx$comment.$t; // comment data
               let splitKeyword = row.gsx$keyword.$t.split(';'); // split item
               let mappedItem = $.map(splitKeyword, $.trim).filter(Boolean); // trim and filter

               mappedItem.forEach(function (word) { // looping mapped item
                  let cleanWord = _this.escapeCharacter(word); // escape character
                  let regexp = new RegExp('\\b'+ cleanWord +'\\b', 'gi'); // regexp pattern

                  $text.contents().filter(function () { // filter text node element
                     return this.nodeType === 3;
                  })
                  .replaceWith(function () { // replace matched element with style
                     return (this.nodeValue || '').replace(regexp, function (matched) {
                        return '<span class="'+ className +'" title="'+ commentData +'" style="'+ style +' padding: 2px;">'+ matched +'</span>';
                     });
                  });
               });
            });
         });
      }, function (err) {
         console.log(err);
      });

      return this; // return this class
   }

   highlightByRegexp() { // highlighting by regexp
      let _this = this; // this class
      let adData = _this.adData; // filteredAds
      let regexp = _this.data.highlighterData.regexp; // regexp
      let className = _this.data.highlighterData.className; // className
      let commentData = _this.data.highlighterData.commentData; // commentData
      let style = _this.data.highlighterData.style; // style

      adData.then(function (result) { // promises data ads
         result.forEach(function (item, i) { // loop each result
            let adData = item; // ad data
            let $text = $.merge(adData.adTitle, adData.adDescription); // merge element

            $text.contents().filter(function () { // filter text node element
               return this.nodeType === 3;
            })
            .replaceWith(function () { // replace matched element with style
               return (this.nodeValue || '').replace(regexp, function (matched) {
                  return '<span class="'+ className +'" title="'+ commentData +'" style="'+ style +' padding: 2px;">'+ matched +'</span>';
               });
            });
         });
      }, function (err) {
         console.log(err);
      });

      return this; // return this class
   }

   tooltip() { // tooltip
      let _this = this; // this class
      let className = _this.data.highlighterData.className; // className
      let findClass = '.' + className; // findClass
      let style = _this.data.highlighterData.style; // style
      let adData = _this.adData; // filteredAds

      adData.then(function (result) { // promises data ads
         result.forEach(function (item, i) { // loop each ad
            let $ad = item.adElement; // this ad
            let $tooltip = $ad.find(findClass); // to be tooltip

            if (!$ad.find(findClass).length) { // checking className
               return;
            }

            $tooltip.on('mouseenter', function () { // on mouseenter event
               let $this = $(this); // this element
               let title = $this.attr('title'); // this title
               let tiptextCss = { // tooltip style
                  'display': 'none',
               	'position': 'absolute',
               	'border': '1px solid #333333',
               	'background-color': '#161616',
               	'border-radius': '5px',
               	'padding': '10px',
               	'color': '#FFFFFF',
               	'font-size': '24px',
               	'z-index': '100',
                  'text-align': 'justify',
                  'line-height': '1.2em'
               };

               $this.data('tiptext', title) // data tooltip
                  .removeAttr('title'); // remove attr title

               if (title) { // check if title is exist
                  let $p = $('<p />', {
                     class: 'tiptext',
                     text: title,
                     css: tiptextCss
                  });

                  $p.appendTo('body').fadeIn(); // append when mouseenter
               }
            })
            .on('mouseleave', function () { // on mouseleave event
               let $this = $(this); // this element
               let tiptext = $this.data('tiptext'); // this tiptext
               let $tiptext = $('.tiptext'); // tiptext element

               $this.attr('title', tiptext); // set title
               $tiptext.remove(); // remove tiptext
            })
            .on('mousemove', function (e) { // on mousemove event
               let x = e.pageX; // mouse position X
               let y = e.pageY + 15; // mouse position Y
               let $tiptext = $('.tiptext'); // tiptext element
               let tiptextCss = { // tiptextCss
                  'top': y,
                  'left': x
               };

               $tiptext.css(tiptextCss); // set tiptext css
            });
         });
      }, function (err) {
         console.log(err);
      });

      return this; // return this class
   }

   setCustomMessage() { // create custom message
      let _this = this; // this class
      let adData = _this.adData; // ads
      let messageClass = _this.data.highlighterData.message.className; // message class
      let messageStyle = _this.data.highlighterData.message.style; // message style
      let messageStyleBackground = _this.data.highlighterData.message.styleBackground; // message style background
      let messageTitle = _this.data.highlighterData.message.title; // message title
      let messageDescription = _this.data.highlighterData.message.description; // message description
      let messageBox = `<div class="moderation-error__container ${messageClass}" style="${messageStyle}">
      	<span class="error-message">${messageTitle}</span>
      	<span class="error-description">${messageDescription}</span>
      </div>`; // custom message box

      adData.then(function (result) {
         result.forEach(function (item, i) { // looping ads
            let $ad = item.adElement; // ad
            let $row = $ad.closest('.row'); // ad row (this is actually it's own element)
            let $adDescription = item.adDescription; // offercontainer
            let $customMessage = $ad.find('.' + messageClass); // message class

            if (!$customMessage.length) { // check if box already exist
               $adDescription.before($(messageBox)); // append if not exist
               $row.css(messageStyleBackground); // custom css
            }
         });
      }, function (err) {
         console.log(err);
      });

      return this; // return this class
   }

   setCustomLogo() { // add logo to filteredAds
      let _this = this; // this class
      let adData = _this.adData; // ads
      let $logo = $('<img />', { // image logo
         src: _this.data.highlighterData.logo,
         class: _this.data.highlighterData.className + '_logo',
         css: {
            width: '90px',
            opacity: '0.2',
            margin: '0 5px'
         }
      });
      let logoContainerClass = 'container-logo'; // container class
      let $logoContainer = $('<div />', { // div logo container
         class: logoContainerClass,
         css: {
            'position': 'absolute',
            'top': '35%',
            'text-align': 'center',
            'width': '100%',
            'z-index': '1'
         }
      });
      let adDescriptionCss = { // new style ad description
         'position': 'relative',
         'z-index': '2'
      };

      adData.then(function (result) { // wait for promises data
         result.forEach(function (item, i) { // loop ad
            let $ad = item.adElement; // ad
            let $adDescription = item.adDescription; // ad description
            let $offerContainer = $ad.find('.offercontainer'); // offercontainer

            $adDescription.css(adDescriptionCss); // set new css

            if (!$ad.find('.' + logoContainerClass).length) { // check container
               $logoContainer.clone().appendTo($offerContainer); // appendTo container
            }

            if (!$ad.find('.'+ _this.data.highlighterData.className +'_logo').length) { // check if logo already exist
               $ad.find('.' + logoContainerClass).append($logo.clone()); // appending logo
            }
         });
      }, function (err) {
         console.log(err);
      });

      return this; // return this class
   }

   setCustomPhoto() { // add logo to filteredAds
      let _this = this; // this class
      let adData = _this.adData; // ads
      let $logo = $('<img />', { // image logo
         src: _this.data.logo,
         class: _this.data.className + '_logo',
         css: {
            width: '20px',
            opacity: '0.2',
            margin: '0 5px'
         }
      });
      let logoContainerClass = 'container-logo'; // container class
      let $logoContainer = $('<div />', { // div logo container
         class: logoContainerClass,
         css: {
            'position': 'absolute',
            'top': '35%',
            'text-align': 'center',
            'width': '100%',
            'z-index': '1'
         }
      });
      let adDescriptionCss = { // new style ad description
         'position': 'relative',
         'z-index': '2'
      };

      adData.then(function (result) { // wait for promises data
         result.forEach(function (item, i) { // loop ad
            let $ad = item.adElement; // ad
            let $adDescription = item.adDescription; // ad description
            let $offerContainer = $ad.find('.offercontainer'); // offercontainer

            $adDescription.css(adDescriptionCss); // set new css

            if (!$ad.find('.' + logoContainerClass).length) { // check container
               $logoContainer.clone().appendTo($offerContainer); // appendTo container
            }

            if (!$ad.find('.'+ _this.data.className +'_logo').length) { // check if logo already exist
               $ad.find('.' + logoContainerClass).append($logo.clone()); // appending logo
            }
         });
      }, function (err) {
         console.log(err);
      });

      return this; // return this class
   }

   setCustomBadge() { // set custom badge for legitimate user
      let _this = this; // this class
      let adData = _this.adData; // ads
      let highlighterData = _this.data.highlighterData; // highlighterData

      adData.then(function (result) {
         result.forEach(function (item, i) {
            let adElement = item.adElement; // ad element
            let checkBadge = adElement.find('.'+highlighterData.className).length; // check badge if exist

            if (checkBadge) { // check badge
               return;
            }

            if (adElement.is('.adLI')) { // if adLI
               let $container = adElement.find('.table .actions').parent(); // container
               let $badge = $('<img />', { // bagde
                  src: highlighterData.logo, // badge source image
                  class: highlighterData.className, // image className
                  css: { // badge css
                     'width': '50px',
                     'top': '-55px',
                     'left': '119px',
                     'position': 'absolute'
                  }
               });

               $container.prepend($badge.clone()) // prepend element
                  .css({'position': 'relative'}); // set custom css
            } else { // if duplicateLI
               let $container = adElement.find('.details tr'); // container
               let $badge = $('<img />', { // bagde
                  src: highlighterData.logo, // badge source image
                  class: highlighterData.className, // image className
                  css: { // badge css
                     'width': '50px'
                  }
               });

               $container.prepend($badge.clone()); // prepend element
            }
         })
      }, function (err) {
         console.log(err);
      });

      return this; // return this class
   }

   disableApprove() { // disbale approve button
      let _this = this; // this class
      let adData = _this.adData; // ads

      adData.then(function (result) { // wait for promises data
         result.forEach(function (item, i) { // loop each ad
            let $ad = item.adElement; // ad
            let $approve = $ad.find('.acceptAd'); // approve button
            let $approveClone = $approve.clone(true); // clone original approve button

            $approve.off('click') // remove original click event
               .text('STOP !') // set text
               .removeAttr('href') // remove attr href
               .removeClass('type5 acceptAd') // remove approve class "type5"
               .addClass('type4') // add new class
               .on('click', function () { // set new click event handler
                  let message = 'WARNING! the content of this ad contains several elements that are not in accordance with applicable policies. Continue ?'; // message confirmation
                  let confirmation = confirm(message); // confirmation

                  if (!confirmation) // checking confirmation
                     return false;

                  $(this).replaceWith($approveClone); // replace with original
               });
         });
      }, function (err) {
         console.log(err);
      });

      return this; // return this class
   }

   blink() { // blinker element
      let _this = this; // this class
      let adData = _this.adData; // ads
      let tagId = 'blink'; // tag id
      let $styleSheet = `<style id="${tagId}">
         @keyframes blink {
            50% { opacity: 0; }
         }
         .blink {
            color: gold;
            background: #000;
            animation: blink 0.7s linear infinite;
         }
      </style>`; // style sheet blinker

      if (!$('body').find('.' + tagId).length) { // check style tag if not
         $('body').append($styleSheet);
      }

      adData.then(function (result) { // wait for promises data
         result.forEach(function (item, i) { // loop ads
            let $price = item.adPrice; // ad price
            let className = 'blink'; // blink class

            $price.addClass(className); // add new class
         });
      }, function (err) {
         console.log(err);
      });

      return this; // return this class
   }
}
