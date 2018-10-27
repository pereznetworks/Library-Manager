'use strict';
/* importing sequelize db */
var db = require('../models/index.js');

// here are helper utils I wrote for this project ....

const addLeadingZero = function(num){

   // for use with date strings
   // tercery statement inspired by posts from stackoverflow

   // add leading zero if num less then 10
   // dontadd leading zero if day is NOT < 10
   // return statement converts interger to a string

   return (num < 10) ? ("0" + num) : num.toString();
};

const ldgZeroForLibraryId = function(num){

   // for use with library_id field
   // same tercery statement by posts on stackoverflow

   // add leading zero if num less then 1000
   // model validation adds 100 to the library id
   // only add leading zero if day is => 1000
   // return statement converts interger to a string

   return (num < 1000) ? ("0" + num) : num.toString();
};

const getNextLibraryID = function(numOfPatrons){
    // used to create and simulate an auto-incremented library_id
    var num = ldgZeroForLibraryId(101 + numOfPatrons);
    return `MCL${num}`;
}

const getADate = function(returninSoManyDays){

   // get current date: format, 2018/10/01
   // if no arg passed, 'returninSoManyDays' gets todays's date
   // otherwise gets future date, that is <returninSoManyDays> days from today

   if (!returninSoManyDays) {
     var d = new Date();
     var day = d.getDate();
     day = addLeadingZero(day);
     var month = d.getMonth() + 1;
     month = addLeadingZero(month);
     var year = d.getFullYear().toString();
     return `${year}-${month}-${day}`;

    } else {

     var rd = new Date();
     rd.setDate(rd.getDate() + returninSoManyDays);
     var plus7Days = rd.getDate()
     var returnDay = addLeadingZero(plus7Days);
     var month = rd.getMonth() + 1;
     var returnMonth = addLeadingZero(month);
     var returnYear = rd.getFullYear().toString();
     return `${returnYear}-${returnMonth}-${returnDay}`;
   }

};

/* pagination method
  // used by all 3 routes; loans books and pages
  // method to separate more an array with more than 10 elements...
  // into an array of arrays, 10 element per 1 array
  // actual pagination done implemented by...
  //  bookViews/loanViews and patronViews index.pug templates
*/
const paginate = function(anArray){
    let pagesArray = []
    let noPages = Math.floor(anArray.length/10)
    for (let pageIndex = 0; pageIndex <= noPages; pageIndex++)
        pagesArray[pageIndex] = anArray.filter(
            function(item, index){
              if (pageIndex == Math.floor(index/10))
               return item
              });
    return pagesArray;
    };

/* method used to validate input fields for model attributes
   did'nt use these..
   a scope issue prevents validaton in models from using these methods
 */

const checkIfNumbersOnly = function(inputField){

   const hasOnlyNums = /^[0-9]+$/;
   if (inputField.match(hasOnlyNums)) {
      throw new Error(`Oops, this ${inputField} has only numbers`);
   }

};

const checkifCappedWords = function(inputField){

   const firstLetterOfWordNotCaped = /\b([a-z])/g
   if (inputField.match(wordsNotCapped)){
      throw new Error(`Oops, Please capitilze first letter of each word.`);
   }

};

const checkAddressLength = function(inputField){

   if (inputField.match(/\s+/g).length < 3){
     throw new Error(`Oops, This doesn't seem to be full address.`);
   }

};

const checkZipCodeLength = function(inputField){

   if (inputField.match(/^(\d){5}$/g).length < 3){
     throw new Error(`Oops, ${inputField} are 5 digits long`);
   }

};

module.exports.addLeadingZero = addLeadingZero;
module.exports.ldgZeroForLibraryId = ldgZeroForLibraryId;
module.exports.getNextLibraryID = getNextLibraryID;
module.exports.getADate = getADate;
module.exports.checkIfNumbersOnly = checkIfNumbersOnly;
module.exports.checkifCappedWords = checkifCappedWords;
module.exports.checkAddressLength = checkAddressLength;
module.exports.checkZipCodeLength = checkZipCodeLength;
module.exports.paginate = paginate;
