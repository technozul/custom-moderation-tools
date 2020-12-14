/**
* custom duplicate dialog action moderation panel
* add custom action for duplicate dialog in moderation panel
*/


export class CustomDuplicateLayerTools { // custom duplicate dialog class
   constructor() { // cosntructor
      this.checkboxAll()
         .actionRejectAll()
         .changeAllCategory()
         .actionRejectInvalidPrice();
   }

   checkboxAll() { // checklist all checkbox
      let $layer = $('.layer'); // layer duplicate
      let $checkboxAll = $('<input />', { // create checkboxAll
         type: 'checkbox',
         class: 'select-all',
         css: {
            'position': 'absolute',
            'top': '25px',
            'left': '35px',
            'transform': 'scale(3.5)',
            'cursor': 'pointer'
         }
      });

      $checkboxAll.prependTo($layer).on('click', function () { // append and add event
         let $this = $(this); // this checkboxAll
         let $checkbox = $('.duplicates .checkbox:not(".select-all")'); // ad checkboxAll

         if (!$this.is(':checked')) { // check all
            $checkbox.not(':not(".selected")').click();
         } else {
            $checkbox.not('.selected').click();
         }
      });

      return this; // return this class
   }

   actionRejectAll() { // handle reject all
      let $actions = $('#multipleActionForAllDuplicates'); // actions
      let $actionContainer = $actions.parent(); // actions container duplicate dialog
      let actionClass = 'button big4 br3 type4 tcenter'; // custom class
      let actionCss = {'margin': '0 10px', 'padding': '0 25px'}; // custom css

      $actions.off('change') // unbind event "change"
         .css(actionCss) // add css)
         .addClass(actionClass) // add custom class
         .on('change', function () { // bind new "change" event
            let $this = $(this); // this element
            let val = $this.val(); // action value
            let confirmation = confirm('Reject all ads as ' + $(this).find('option:selected').text() + '?'); // confirmation dialog

            if (confirmation) {
               let sleep = 0; // sleep
               let $duplicate = $('#duplicatesDialog'); // duplicate dialog
               let $ads = $duplicate.find('.duplicateLI'); // ads

               $ads.each(function (idx, ad) { // looping ads
                  let $ad = $(ad); // ad
                  let $adAction = $ad.find('.banDuplicate'); // ad action

                  setTimeout(function () { // settimeout each action
                     if (val !== 'invalidPrice') {
                        $adAction.val(val).change(); // trigger "change" dropdown
                     } else {
                        $ad.find('.wrongPrice').click(); // trigger "click" invalid price
                     }
                  }, sleep);
               });

               sleep += 100; // increment sleep
            }

            $this.find('option:eq(0)').prop('selected', true); // revert option to default "no choose"
         });

      return this; // return this class
   }

   actionRejectInvalidPrice() { // handle invalid price
      let $actions = $('#multipleActionForAllDuplicates'); // actions
      let $actionContainer = $actions.parent(); // actions container duplicate dialog
      let $newButton = $('<a />', { // create new button
         class: 'button button-custom-reject-price-all big5 br3 type5 cfff tcenter',
         text: 'Invalid Price (ALL)',
         css: {
            'padding': '0 25px',
            'margin': '0 10px'
         }
      });

      $newButton.appendTo($actionContainer).on('click', function () { // append and add event
         let sleep = 0; // sleep
         let confirmation = confirm('Reject all ads as Invalid Price?'); // confirmation

         if (confirmation) {
            let $invalidPrice = $('.duplicates .wrongPrice'); // invalid price ad button

            $invalidPrice.each(function (idx, button) {
               let $this = $(button); // this button

               setTimeout(function () { // settimeout each action
                  $this.click(); // trigger click
               }, sleep);

               sleep += 100; // increment sleep
            });
         }
      });

      return this; // return this class
   }

   changeAllCategory() { // handle change all category
      let _this = this; // this class
      let $actions = $('#multipleActionForAllDuplicates'); // actions
      let $actionsContainer = $actions.parent(); // actions container duplicate dialog
      let $conteinerSelectCategory = $('<ul />', { // select category container
         class: 'hidden selectcategory container-selectcategory',
         css: {
            'position': 'absolute',
            'text-align': 'left',
            'top': '25px',
            'left': '10px'
         }
      });
      let $newContainer = $('<div />', { // container change all category
         class: 'container-change-all-category',
         css: {
            'display': 'inline',
            'position': 'relative'
         }
      });
      let $newButton = $('<a />', { // new button
         class: 'button button-custom-change-all-category big5 br3 type1 cfff tcenter',
         text: 'Change Category (ALL)',
         css: {
            'padding': '0px 25px',
            'margin': '0px 10px'
         }
      });
      let changeCategoryEvent = function () {
         let $this = $(this); // this button
         let $changeCategory = $('.duplicates .changeCategory').each(function (idx, item) {
            let $item = $(item);
            let sleep = 0; // sleep timeout

            setTimeout(function () {
               $item.click() // click trigger
                  .next('.selectcategory') // find next element
                  .hide(); // then hide
            }, sleep += 100);
         });
      };
      let showCategoryMenu = function () {
         let $this = $(this); // this button
         let containerCategory = '.container-selectcategory'; // containerCategory class

         changeCategoryEvent(); // fire click

         setTimeout(function () {
            $(containerCategory).show(); // show menu
         }, 100);

         if ($(containerCategory).children().length > 0) { // check element
            $(containerCategory).empty(); // remove element
            return false;
         }

         let $changeCategory = $('.duplicates .changeCategory:first'); // changeCategory element

         $changeCategory.click() // trigger click
            .next('.selectcategory') // find next element
            .hide() // then hide
            .bind('DOMNodeInserted', function (e) { // bind node insert
               let $first = $(this); // this container
               let $cloned = $(e.target).clone(); // clone event target

               $cloned.appendTo($conteinerSelectCategory) // append cloned // bind event
                  .on('mouseover', function (e) { // on mouseover
                     let $this = $(this); // this li
                     let $ul = $this.children('ul'); // ul children
                     let $parent = $this.parent(); // li parent

                     $parent.children('li') // child li
                        .children('ul') // child ul
                        .hide(); // hide

                     $ul.show(); // show children
                  })
               .find('li') // find li element
                  .on('mouseover', function () { // on mouseover
                     let $this = $(this); // this li
                     let $ul = $this.children('ul'); // ul children
                     let $parent = $this.parent(); // li parent

                     $parent.children('li') // child li
                        .children('ul') // child ul
                        .hide(); // hide

                     $ul.show(); // show children
                  })
               .find('.leaf') // find leaf element
                  .removeAttr('href') // remove href attribute
                  .on('click', function () { // on click
                     let $this = $(this); // this leaf
                     let $ads = $('.duplicates .duplicateLI'); // ads on duplicate layer
                     let leafId = $this.attr('data-id'); // leaf id

                     $this.closest('.container-selectcategory').hide(); // hide element

                     $ads.each(function (idx, ad) {
                        let $ad = $(ad); // this ad
                        let sleep = 0; // sleep timeout
                        setTimeout(function () {
                           $ad.find('a[data-id="'+ leafId +'"]').click(); // trigger click
                        }, sleep += 100);
                     })
                  });
            });

            $('.duplicates').on('click', function () { // bind click event
               $(containerCategory).hide();
            });
      };

      $newContainer.appendTo($actionsContainer); // append element
      $newButton.appendTo($newContainer); // append element
      $conteinerSelectCategory.appendTo($newContainer); // append element
      $newButton.on('click', showCategoryMenu); // add event

      return this; // return this class
   }
}
