/**
* verified used motorcycle moderation panel
* verified used motorcycle in moderation panel
*/

import {Filters} from './modules/Filters.js'; // import module Filters
import {Helpers} from './modules/Helpers.js'; // import module Helpers

export class VerifiedUsedMotorcycle { // VerifiedUsedMotorcycle class
   constructor() { // cosntructor
      this.data = {}; // data
      this.config = { // spreadsheet config
         name: 'Verified Used Motorcycle',
         key: '16hi-4XcGF3S0kLoayiNzHzhOpKmXSCfI8UmadE3m25w', // worksheet key
         feed: 'list', // feed method
         wsheet: 'od6', // worksheet id
         mod: 'public', // modifier public or private
         get url() { // api url
            return 'https://spreadsheets.oleks.id/feeds/'+ this.feed +'/'+ this.key +'/'+ this.wsheet +'/'+ this.mod +'/values?alt=json&callback=?';
         }
      }; // highlighter data

      this.init(); // init run
   }

   init() { // initialized
      let _this = this; // this class
      let helpers = new Helpers(); // Helpers
      let promise = helpers.getJsonData(_this.config); // get spreadsheet data

      promise.done(function (jsonData) { // handle success
         _this.data.spreadsheetData = jsonData.feed.entry; // assign data
         _this.data.highlighterData = { // highlighter data
            className: 'badge-verified-used-motorcycle', // className cannot same with other module, please make unique
            logo: require('../images/verified.png') // set badge
         };
         _this.data.filterMethod = { // filter method
            category: ['423'] // filter category to be enabled (hermes category)
         };

         _this.handle(); // handler
      })
      .fail(function (err) { // handle fail
         console.log('Error while retrieving data: '+config.name);
         alert('Error while retrieving data: '+config.name);
         return false;
      });

      return this; // return this class
   }

   handle() { // handler
      let _this = this; // this class
      let filters = new Filters(_this.data); // Filters

      filters.filterByEmail() // filter by email

         .staticFilterByCategory() // static filter by category

         .setCustomBadge(); // set custom badge

      return this; // return this class
   }
}
