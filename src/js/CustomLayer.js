/**
* custom duplicate dialog action moderation panel
* add custom action for duplicate dialog in moderation panel
*/


export class CustomLayer { // custom duplicate dialog class
   constructor() { // cosntructor
      this.actionLayer();
   }
   actionLayer() { // handle invalid price
      var $ads = $('.duplicateLI'); // ads
      $ads.each(function (idx, ad) {
         // looping ads
         var $ad = $(ad); // ad
         var val = $ad.val(); // action value
         var $inner = $ad.find('.inner .rel'); // actions
         var $text = $ad.find('.duplicateDescription'); // actions
         var $title = $ad.find('.duplicateDescription');
         var $photos = $ad.find('.photos'); // actions
         var $details = $ad.find('.details'); // actions
         var $actions = $ad.find('p'); // parapgraph
         var $actionContainer = $details.parent(); // actions container duplicate dialog
         //var $adcard =  $ad.find('.marginbott10 .xxx-large .fbold').attr('href'); // adcard href

         var $target = $ad.find('.duplicateTitle');
         var $href = $target.find('a:contains("ad card")').attr('href');

         //var $testing = $text.contents().unwrap();
         var $title = $ad.find('.newTitle'); // actions
         //var $testing2 = $title.contents().unwrap();
         $.get($href, function (response) {
         var $result = $(response).find(".adDescription").text();
         var $kondisi = $(response).find(".usercard__userad-userinfo__table > tbody > tr:last > td").text();

         $('<span class="fleft fbold large inlblk lheight26"></span>').appendTo($details).text("Kondisi "+$kondisi+" ").blur;
         $('<textarea style="width:100%; height: 200px;"></textarea>').appendTo($actionContainer).text($result).blur;
         $photos.appendTo($actionContainer);
         return this; // return this class
         });
      });
   }
}
