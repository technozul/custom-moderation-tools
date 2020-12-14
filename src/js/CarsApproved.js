/**
* BekasJadiBerkah moderation panel
* BekasJadiBerkah in moderation panel
*/


export class CarsApproved { // BekasJadiBerkah class
   constructor() { // cosntructor
      this.init(); // init run
   }

   init() { // initialized
      let _this = this; // this class
      let $ads = $('.adLI.row'); // ads element
		let hermesCategory = ['422']; // hermes category enable bjb
				let newCss = {
			'background': '#eaffea'
		};

		$ads.each(function () { // loop ad
			let $this = $(this); // this ad
			let adCategory = $this.attr('data-categories_path'); // ad category
			let adCategoryL1 = adCategory.split(',')[0]; // ad category L1
			let adCategoryL2 = adCategory.split(',')[1]; // ad category L2
      let accept        = $this.find('.acceptAd').text();
      let ok            = accept.includes("ok(");

      let target = $this.find('.head'); // head
      let $href = target.find('a:contains("ad card")').attr('href');


      //get location info in user card
      $.get($href, function (response) {
      let loc           = $(response).find("a[href='#savedDatalocations']").text();
      let jkt           = loc.includes("Bogor");
      let sby           = loc.includes("Surabaya");
			let categoryCheck = ($.inArray(adCategoryL1, hermesCategory) !== -1) || ($.inArray(adCategoryL2, hermesCategory) !== -1); // check matched category

			if (categoryCheck && sby) {
				//$this.css(newCss);
        var $logo = $('<img />', { // image logo
           src: require('../images/car.png'),
           class: 'carsapproved',
           css: {
             'width': '40px',
             'top': '-42px',
             'left': '67px',
             'position': 'absolute'
           }
        });

        var $prependlogo = $this.find('.table .actions').parent().prepend($logo.clone()).css({'position': 'relative'});
			}
		});

    return this; // return this class
    });
      return this; // return this class
   }
}
