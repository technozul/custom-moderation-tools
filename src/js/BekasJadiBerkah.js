/**
* BekasJadiBerkah moderation panel
* BekasJadiBerkah in moderation panel
*/


export class BekasJadiBerkah { // BekasJadiBerkah class
   constructor() { // cosntructor
      this.init(); // init run
   }

   init() { // initialized
      let _this = this; // this class
      let $ads = $('.adLI.row'); // ads element
		let hermesCategory = ['417', '419', '415', '418', '421']; // hermes category enable bjb
		let regexp = new RegExp('\\B(\#BekasJadiBerkah\\b)', 'gi'); // pattern hastag BJB
		let newCss = {
			'background': '#eaffea url('+ require('../images/bjb_bot.png') +') repeat-x bottom'
		};

		$ads.each(function () { // loop ad
			let $this = $(this); // this ad
			let adTitle = $this.find('.adTitle').text().trim(); // ad title
			let adPrice = $this.find('.label-pricehl').text().replace(/\D/g, ''); // ad price
			let adCategory = $this.attr('data-categories_path'); // ad category
			let adCategoryL1 = adCategory.split(',')[0]; // ad category L1
			let adCategoryL2 = adCategory.split(',')[1]; // ad category L2

			let hashtagCheck = regexp.test(adTitle); // check matched hashtag
			let priceCheck = (1 == parseInt(adPrice)); // check matched price
			let categoryCheck = ($.inArray(adCategoryL1, hermesCategory) !== -1) || ($.inArray(adCategoryL2, hermesCategory) !== -1); // check matched category

			if (hashtagCheck && priceCheck && categoryCheck) {
				$this.css(newCss);
			}
		});

      return this; // return this class
   }
}
