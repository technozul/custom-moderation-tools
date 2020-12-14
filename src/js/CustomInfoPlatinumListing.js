/**
* custom duplicate dialog action moderation panel
* add custom action for duplicate dialog in moderation panel
*/


export class CustomInfoPlatinumListing { // custom info location in moderation tools
   constructor() { // cosntructor
      this.actionInfoPlatinumListing();
   }
   actionInfoPlatinumListing() { // handle info location
      var $ads = $('.adLI'); // ads
      $ads.each(function (idx, ad) {
         // looping ads
         var $ad = $(ad); // ad

         var $target     = $ad.find('.head'); // head
         var $sub       = $ad.find('.subinfo'); // sub info in head
         var $href      = $target.find('a:contains("ad card")').attr('href');
         var $locremove = $target.find("span[class*='fleft fbold marginleft5 large inlblk lheight26 marginright10']").remove();

         //get user id in ad card
         $.get($href, function (response) {
            var $target2 = $(response).find(".info-value").textContent;
            var $tooltip = $('<span class="fleft fbold large inlblk lheight26"></span>').appendTo($sub).text($target2).blur;
            alert ($target);
         return this; // return this class
         });
      });
   }
}
