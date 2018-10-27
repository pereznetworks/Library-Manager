'use strict';

/* importing my own helper utils */
var utils = require('../utils/index.js')

// dont forget to update dates in this seed data to current dates before submit...
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Loans', [
            {
                book_id:15,
                patron_id:2,
                loaned_on:'2018-10-18',
                return_by:'2018-10-25',
                returned_on:null,
                current: true
            },
            {
                book_id:4,
                patron_id:1,
                loaned_on:'2018-10-23',
                return_by:'2018-10-30',
                returned_on:null,
                current: true
            },
            {
                book_id:8,
                patron_id:1,
                loaned_on:'2018-10-24',
                return_by:'2018-10-31',
                returned_on:null,
                current: true
            },
            {
                book_id:9,
                patron_id:3,
                loaned_on:'2018-10-25',
                return_by:'2018-11-01',
                returned_on:null,
                current: true
            },
            {
                book_id:11,
                patron_id:4,
                loaned_on:'2018-10-13',
                return_by:'2018-10-20',
                returned_on:'2018-10-17',
                current: true
            },
        ]);

  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Loans', null, {});
  }
};
