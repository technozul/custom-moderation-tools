/**
* invalid photo moderation panel
* change some element layout in moderation panel
*/


export class InvalidPhoto { // custom layout class
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
         let $img= ($photos.find("li").length);//count image in container

         if ($img<1){
               var $logo = $('<img />', { // image logo
                  src: require('../images/invalid-photo.png'), // custom logo
                  class: 'invalidphoto',
                  css: {
                     width: '40%',
                     margin: '0 5px'
                  }
               });
               var logoContainerClass = 'container-logo'; // container class
               var $logoContainer = $('<div />', { // div logo container
                  class: logoContainerClass,
                  css: {
                     'background':'white',
                     'background-size':'100px',
                     'position': 'absolute',
                     //'top': '35%',
                     'text-align': 'center',
                     'width': '100%',
                     'height':'80%',
                     'z-index': '1'
                  }
               });

               let $prependcontainer= $logoContainer.clone().prependTo($offercontainer); // prependTo container
               let $prependlogo= $prependcontainer.prepend($logo.clone()); //prepend logo to container

               let $approve = $ad.find('.acceptAd'); // approve button
               let $approveClone = $approve.clone(true); // clone original approve button

               $approve.off('click') // remove original click event
               .text('STOP !') // set text
               .removeAttr('href') // remove attr href
               .removeClass('type5 acceptAd') // remove approve class "type5"
               .addClass('type4') // add new class

               $offercontainer.on("click", function() {
                  $prependlogo.remove(); //remove
                  $approve.replaceWith($approveClone); // replace with original
               });
            }
      });
   }
}
