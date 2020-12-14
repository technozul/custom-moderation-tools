/**
* invalid photo moderation panel
* change some element layout in moderation panel
*/

export class CustomUserLabels { // custom layout class
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
         let $userlabel = $ad.find('.adcard_userlabels').text();
         let $corporate = $userlabel.includes("Corporate User");
         let $trusted = $userlabel.includes("Trusted");
         let $incubator = $userlabel.includes("Incubator");
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

         let $prependcontainer= $logoContainer.clone().prependTo($offercontainer); // prependTo container

         //show corporate label
         if ($corporate== true){
               var $logo = $('<img />', { // image logo
                  src: require('../images/corporate.png'), // custom logo
                  class: 'invalidphoto',
                  css: {
                    width: '90px',
                    opacity: '0.2',
                    margin: '0 5px'
                  }
               });

               let $prependlogo= $prependcontainer.prepend($logo.clone()); //prepend logo to container

            }

            //show incubator
            if ($incubator== true){
                  var $logo = $('<img />', { // image logo
                     src: require('../images/incubator.png'), // custom logo
                     class: 'invalidphoto',
                     css: {
                       width: '90px',
                       opacity: '0.2',
                       margin: '0 5px'
                     }
                  });

                  let $prependlogo= $prependcontainer.prepend($logo.clone()); //prepend logo to container

               }

               //show icon trusted
               if ($trusted== true){
                     var $logo = $('<img />', { // image logo
                        src: require('../images/trusted.png'), // custom logo
                        class: 'invalidphoto',
                        css: {
                          width: '90px',
                          opacity: '0.2',
                          margin: '0 5px'
                        }
                     });

                     let $prependlogo= $prependcontainer.prepend($logo.clone()); //prepend logo to container

                  }
      });
   }
}
