/**
* custom highlighter module moderation panel
* highlighter module in moderation panel
*/

import {Helpers} from './Helpers.js'; // import module helper
import {AsyncArray} from './AsyncArray.js'; // import module AsyncArray

export class Filters extends Helpers { // highlighter module class
   constructor(data = {}) { // cosntructor
      super(data); // construct parent
   }

   filterByKeyword() { // filter by keyword
      let _this = this; // this class
      let asyncArray = new AsyncArray(_this.adData); // async array adData
      let filteredAds = asyncArray.filterAsync(async function (element, index) { // filter async array
         return new Promise(function (resolve) { // return new promise from async array
            setTimeout(function () { // sleep timeout
               let adData = element; // ad data
               let adTitle = adData.adTitle.text().trim().replace(/\r?\n/g, '<br />').replace(/\s+/g, ' '); // ad title
               let adDescription = adData.adDescription.text().trim().replace(/\r?\n/g, '<br />').replace(/\s+/g, ' '); // ad description
               let adTargetKeyword = (!adData.adTargetKeyword.processed) ? _this.data.spreadsheetData : adData.adTargetKeyword.data;

               adData.adTargetKeyword.processed = true; // change flag

               let filteredTargetKeyword = adTargetKeyword.filter(function (row, i) { // filter spreadsheetData
                  let counter = 0; // counter
                  let splitWords = row.gsx$keyword.$t.split(';'); // split keywords
                  let mappedSplitWords = $.map(splitWords, $.trim).filter(Boolean); // mapped split words

                  mappedSplitWords.forEach(function (keyword, ii) {
                     let word = _this.escapeCharacter(keyword); // escape character
                     let patt = new RegExp('\\b'+ word +'\\b', 'gi'); // regexp word

                     if (patt.test(adTitle) || patt.test(adDescription)) counter++; // test regexp, increment counter if match
                  });

                  return (counter === mappedSplitWords.length); // return filtered keyword
               });

               adData.adTargetKeyword.data = filteredTargetKeyword; // assign data

               resolve(filteredTargetKeyword.length > 0); // resolve promise
            }, index*15);
         });
      })
      .then(function (result) { // handle async
         return result;
      }, function (err) { // throw error from async
         console.log(err);
      });

      _this.adData = filteredAds; // assign data

      return this; // return this class
   }

   filterByCategory() { // filter by email
      let _this = this; // this class
      let asyncArray = new AsyncArray(_this.adData); // async array adData
      let filteredAds = asyncArray.filterAsync(async function (element, index) { // filter async array
         return new Promise(function (resolve) { // return new promise from async array
            setTimeout(function () { // sleep timeout
               let adData = element; // ad data
               let adCategory = adData.adCategory; // ad email
               let adTargetKeyword = (!adData.adTargetKeyword.processed) ? _this.data.spreadsheetData : adData.adTargetKeyword.data;

               adData.adTargetKeyword.processed = true; // change flag

               let filteredTargetKeyword = adTargetKeyword.filter(function (row, i) { // filter spreadsheetData
                  let l1 = row.gsx$categorylevel1.$t.split('-').pop().replace(/\D/g, ''); // category l1
                  let l2 = row.gsx$categorylevel2.$t.split('-').pop().replace(/\D/g, ''); // category l2
                  let l3 = row.gsx$categorylevel3.$t.split('-').pop().replace(/\D/g, ''); // category l3
                  let check = ''; // check category

                  if (l3 != '') // if l3
                     check = l3
                  else if (l2 != '') // if l2
                     check = l2
                  else if (l1 != '') // if l1
                     check = l1;

                  return (adCategory.indexOf(check) !== -1); // return if match
               });

               adData.adTargetKeyword.data = filteredTargetKeyword; // assign data

               resolve(filteredTargetKeyword.length > 0); // resolve promise
            }, index*15);
         });
      })
      .then(function (result) { // handle async
         return result;
      }, function (err) { // throw error from async
         console.log(err);
      });

      _this.adData = filteredAds; // assign data

      return this; // return this class
   }

   filterByPrice() { // filter by price
      let _this = this; // this class
      let asyncArray = new AsyncArray(_this.adData); // async array adData
      let filteredAds = asyncArray.filterAsync(async function (element, index) { // filter async array
         return new Promise(function (resolve) { // return new promise from async array
            setTimeout(function () { // sleep timeout
               let adData = element; // ad data
               let adPrice = parseInt(adData.adPrice.text().replace(/\D/g, '')); // ad price
               let adTargetKeyword = (!adData.adTargetKeyword.processed) ? _this.data.spreadsheetData : adData.adTargetKeyword.data;

               adData.adTargetKeyword.processed = true; // change flag

               let filteredTargetKeyword = adTargetKeyword.filter(function (row, i) { // filter spreadsheetData
                  let priceMin = parseInt(row.gsx$pricemin.$t.replace(/\D/g, '')); // price min
                  let priceMax = parseInt(row.gsx$pricemax.$t.replace(/\D/g, '')); // price max

                  if (priceMin && priceMax) { // check price
                     return (adPrice >= priceMin) && (adPrice <= priceMax); // return if min and max
                  } else if (priceMin) {
                     return (adPrice <= priceMin); // return if min only
                  } else if (priceMax) {
                     return (adPrice >= priceMax); // return if max only
                  }

                  return true;
               });

               adData.adTargetKeyword.data = filteredTargetKeyword; // assign data

               resolve(filteredTargetKeyword.length > 0); // resolve promise
            }, index*15);
         });
      })
      .then(function (result) { // handle async
         return result;
      }, function (err) { // throw error from async
         console.log(err);
      });

      _this.adData = filteredAds; // assign data

      return this; // return this class
   }

   filterByEmail() { // filter by email
      let _this = this; // this class
      let asyncArray = new AsyncArray(_this.adData); // async array adData
      let filteredAds = asyncArray.filterAsync(async function (element, index) { // filter async array
         return new Promise(function (resolve) { // return new promise from async array
            setTimeout(function () { // sleep timeout
               let adData = element; // ad data
               let adEmail = adData.adEmail.text().trim(); // ad email
               let adTargetKeyword = (!adData.adTargetKeyword.processed) ? _this.data.spreadsheetData : adData.adTargetKeyword.data;

               adData.adTargetKeyword.processed = true; // change flag

               let filteredTargetKeyword = adTargetKeyword.filter(function (row, i) { // filter spreadsheetData
                  let email = _this.escapeCharacter(row.gsx$email.$t.trim()); // email keyword
                  let regexp = new RegExp(email, 'gi'); // regexp pattern

                  return regexp.test(adEmail); // return boolean
               });

               adData.adTargetKeyword.data = filteredTargetKeyword; // assign data

               resolve(filteredTargetKeyword.length > 0); // resolve promise
            }, index*15);
         });
      })
      .then(function (result) { // handle async
         return result;
      }, function (err) { // throw error from async
         console.log(err);
      });

      _this.adData = filteredAds; // assign data

      return this; // return this class
   }

   filterByCondition() { // filter by condition
      let _this = this; // this class
      let asyncArray = new AsyncArray(_this.adData); // async array adData
      let filteredAds = asyncArray.filterAsync(async function (element, index) { // filter async array
         return new Promise(function (resolve) { // return new promise from async array
            setTimeout(function () { // sleep timeout
               let adData = element; // ad data
               let adTargetKeyword = (!adData.adTargetKeyword.processed) ? _this.data.spreadsheetData : adData.adTargetKeyword.data;

               adData.adTargetKeyword.processed = true; // change flag

               let filteredTargetKeyword = adTargetKeyword.filter(function (row, i) { // filter spreadsheetData
                  let condition = row.gsx$condition.$t.toLowerCase(); // condition
                  let adCondition = adData.adInfo.find('.offerStateChange').filter(function () { // ad condition
                     let regexp = /kondisi:/gi; // text condition pattern
                     return regexp.test($(this).text());
                  }).text().split(':').pop().trim().toLowerCase();

                  return (condition && adCondition) ? (condition == adCondition) : true; // return boolean
               });

               adData.adTargetKeyword.data = filteredTargetKeyword; // assign data

               resolve(filteredTargetKeyword.length > 0); // resolve promise
            }, index*15);
         });
      })
      .then(function (result) { // handle async
         return result;
      }, function (err) { // throw error from async
         console.log(err);
      });

      _this.adData = filteredAds; // assign data

      return this; // return this class
   }

   filterByYear() { // filter by year
      let _this = this; // this class
      let asyncArray = new AsyncArray(_this.adData); // async array adData
      let filteredAds = asyncArray.filterAsync(async function (element, index) { // filter async array
         return new Promise(function (resolve) { // return new promise from async array
            setTimeout(function () { // sleep timeout
               let adData = element; // ad data
               let adTargetKeyword = (!adData.adTargetKeyword.processed) ? _this.data.spreadsheetData : adData.adTargetKeyword.data;

               adData.adTargetKeyword.processed = true; // change flag

               let filteredTargetKeyword = adTargetKeyword.filter(function (row, i) { // filter spreadsheetData
                  let year = row.gsx$year.$t.split(';').map(x => x.trim()).filter(Boolean); // year
                  let adYear = adData.adInfo.find('span').filter(function () { // ad year
                     let regexp = /tahun:/gi; // create simple pattern test
                     return regexp.test($(this).text()); // return test
                  }).text().replace(/\D/g, '');

                  if (year.length && adYear != '') { // check
                     return $.inArray(adYear, year) !== -1; // return if exist
                  }

                  return true;
               });

               adData.adTargetKeyword.data = filteredTargetKeyword; // assign data

               resolve(filteredTargetKeyword.length > 0); // resolve promise
            }, index*15);
         });
      })
      .then(function (result) { // handle async
         return result;
      }, function (err) { // throw error from async
         console.log(err);
      });

      _this.adData = filteredAds; // assign data

      return this; // return this class
   }

   filterByCity() { // filter by city
      let _this = this; // this class
      let asyncArray = new AsyncArray(_this.adData); // async array adData
      let filteredAds = asyncArray.filterAsync(async function (element, index) { // filter async array
         return new Promise(function (resolve) { // return new promise from async array
            setTimeout(function () { // sleep timeout
               let adData = element; // ad data
               let adTargetKeyword = (!adData.adTargetKeyword.processed) ? _this.data.spreadsheetData : adData.adTargetKeyword.data;

               adData.adTargetKeyword.processed = true; // change flag

               let filteredTargetKeyword = adTargetKeyword.filter(function (row, i) { // filter spreadsheetData
                  let city = row.gsx$city.$t.split(';').map(x => x.trim()).filter(Boolean); // city
                  let regexp = new RegExp(city.join('|'), 'gi'); // regexp city

                  if (!city.length) { // check city
                     return true;
                  }

                  let adCity = $('.active .subinfo span').filter(function () { // ad city
                     let $this = $(this); // this element
                     let text = $this.text().trim().toLowerCase(); // this text

                     return (regexp.test(text)); // return regexp test
                  });

                  return adCity.length ? true : false; // return if match
               });

               adData.adTargetKeyword.data = filteredTargetKeyword; // assign data

               resolve(filteredTargetKeyword.length > 0); // resolve promise
            }, index*15);
         });
      })
      .then(function (result) { // handle async
         return result;
      }, function (err) { // throw error from async
         console.log(err);
      });

      _this.adData = filteredAds; // assign data

      return this; // return this class
   }

   staticFilterByRegexp () { // static filter by regexp
      let _this = this; // this class
      let asyncArray = new AsyncArray(_this.adData); // async array
      let regexp = _this.data.highlighterData.regexp; // regexp
      let filteredAds = asyncArray.filterAsync(async function (element, index) { // filter async
         return new Promise(function (resolve) { // return new promise
            setTimeout(function () { // sleep timeout
               let adData = element; // ad data
               let adTitle = adData.adTitle.text().trim().replace(/\r?\n/g, '<br />').replace(/\s+/g, ' '); // ad title
               let adDescription = adData.adDescription.text().trim().replace(/\r?\n/g, '<br />').replace(/\s+/g, ' '); // ad description

               resolve(regexp.test(adTitle) || regexp.test(adDescription));
            }, index*15);
         });
      })
      .then(function (result) { // handle async
         return result;
      }, function (err) { // throw error from async
         console.log(err);
      });

      _this.adData = filteredAds; // set data

      return this; // return this class
   }

   staticFilterByCategory() { // static filter by category
      let _this = this; // this class
      let asyncArray = new AsyncArray(_this.adData); // async array
      let filteredAds = asyncArray.filterAsync(async function (element, index) { // filter async array
         return new Promise(function (resolve) { // return new promise from async array
            setTimeout(function () { // sleep timeout
               let adData = element; // ad data
               let adCategory = adData.adCategory; // ad email
               let filterCategory = _this.data.filterMethod.category; // filter category
               let isMatched = false; // is matched category

               filterCategory.forEach(function (category ,i) { // loop category filter
                  if (adCategory.indexOf(category) !== -1) {
                     isMatched = true; // matched ?
                     return false; // break loop
                  }
               });

               resolve(isMatched); // resolve promise
            }, index++);
         });
      })
      .then(function (result) { // handle async
         return result;
      }, function (err) { // throw error from async
         console.log(err);
      });

      _this.adData = filteredAds; // assign data

      return this; // return this class
   }
}
