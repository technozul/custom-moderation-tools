/**
* delcon moderation panel
* add delcon in moderation panel
*/

import {Filters} from './modules/Filters.js'; // import module Filters

export class Delcon { // delcon class
   constructor() { // cosntructor
      this.data = {}; // data
      this.init(); // init run
   }

   init() { // initialized
      let _this = this; // this class

      _this.data.highlighterData = { // highlighter data
         regexp: /(nol|(ko)?song|[o0]|8|((d(e)?)?lapan)|\S+)(([0-9oi]|((ko)?song|nol|satu|dua|tiga|[em]?pat|(li)?ma|(e)?nam|(tu)?juh?|((d(e)?)?la)?pan|(sem(b)?i)?lan)|(se)?(belas|puluh|ratus|ribu))+(\S*|\W*?)){10,}|(\b[0-9A-F]{8}?\b)/gi,
         className: 'delcon', // className
         commentData: 'Contact Detected !', // comment data
         style: 'background: palevioletred;', // style
         logo: require('../images/phone.png'), // custom logo
         useTargetKeyword: false // use target keyword ?
      };

      let filters = new Filters(_this.data); // Filters
      filters.staticFilterByRegexp() // filter by regexp

         .highlightByRegexp() // highlight
         .tooltip() // tooltip
         .disableApprove() // disable approve button
         .setCustomLogo(); // set logo

      return this; // return this class
   }
}
