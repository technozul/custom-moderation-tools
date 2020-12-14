/**
* custom suspected fraud alert highlighter moderation panel
* add custom suspected fraud alert highlighter in moderation panel
*/

import {Filters} from './modules/Filters.js'; // import module Filters
import {Helpers} from './modules/Helpers.js'; // import module Helpers

export class CustomHighlighterSuspectedFraudAlert { // suspected fraud alert highlighter class
   constructor() { // cosntructor
      this.data = {}; // data
      this.config = {
         name: 'Suspected Fraud Alert',
         key: '1wDof4n675bqxK7YJbaxDt0C1Dy5QzwjhwTGQ2kpEl54', // worksheet key
         feed: 'list', // feed method
         wsheet: 'onp4icj', // worksheet id
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
            className: 'custom-highlighter-suspected-fraud-alert',
            style: 'background: grey;',
            message: {
               className: 'custom-message',
               title: 'BE CAREFUL !',
               description: 'Iklan ini terindikasi FRAUD. Cek kembali indikator FRAUD. (Ex: harga, kondisi, tahun, dsb..)',
               style: 'background: black; color: white;',
               styleBackground: {'background': 'lemonchiffon'}
            }
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

      filters.filterByKeyword() // filter by keyword
         .filterByCategory() // filter by category
         .filterByPrice() // filter by category
         .filterByCondition() // filter by condition
         .filterByYear() // filter by year
         .filterByCity() // filter by city

         .highlight() // highlight
         .tooltip() // tooltip
         .disableApprove() // disableApprove
         .setCustomMessage() // set custom message
         .blink(); // blink

      return this; // return this class
   }
}
