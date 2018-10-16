'use strict';

const addLeadingZero = (num) => {
      // add leading zero if num less then 10
      // from stackoverflow
      // MDN days string#padStart not supported on Edge browser yet

      return (num < 10) ? ("0" + num) : num;
  };


const getADate = (returninSoManyDays) => {
      // get current date: format, 2018/10/01
      // or get future date, that is <num> days from now

  if (!returninSoManyDays) {
    var d = new Date();
    var day = d.getDate();
    day = addLeadingZero(day);
    var month = d.getMonth();
    month = addLeadingZero(month);
    var year = d.getFullYear();
    return `${year}-${month}-${day}`;

   } else {

    var rd = new Date();
    rd.setDate(rd.getDate() + returninSoManyDays);
    var plus7Days = rd.getDate()
    var returnDay = addLeadingZero(plus7Days);
    var month = rd.getMonth();
    var returnMonth = addLeadingZero(month);
    var returnYear = rd.getFullYear();
    return `${returnYear}-${returnMonth}-${returnDay}`;
  }

};


module.exports.addLeadingZero = addLeadingZero;
module.exports.getADate = getADate;
