/**
* custom layout moderation panel
* change some element layout in moderation panel
*/


export class CustomLayout { // custom layout class
   constructor() { // cosntructor
      this.init();
   }

   init() { // initialize
      let $adLI = $('.adLI'); // ads

      $adLI.each(function (idx, ad) { // looping ads
         let $ad = $(ad); // ad
         let $photos = $ad.find('.photos'); // photo container
         let $photosunder = $ad.find('.photosunder'); // photosunder container
         let $offercontainer = $ad.find('.offercontainer'); // offerconianer
         let photosCss = { // css for $photos
            'bottom': 'initial',
            'top': 0,
            'border-bottom': '1px solid #CCCCCC'
         };
         let photosunderCss = { // css for $photosunder
            'padding-bottom': 'initial',
            'padding-top': '95px'
         };

         $photos.css(photosCss); // set new css
         $photosunder.css(photosunderCss); // set new css
      });
   }
}
