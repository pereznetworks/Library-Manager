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
            {
                book_id:16,
                patron_id:5,
                loaned_on:'2018-09-18',
                return_by:'2018-09-25',
                returned_on:'2018-09-24',
                current: true
            },
            {
                book_id:5,
                patron_id:6,
                loaned_on:'2018-09-23',
                return_by:'2018-09-30',
                returned_on:'2018-09-29',
                current: true
            },
            {
                book_id:6,
                patron_id:7,
                loaned_on:'2018-08-20',
                return_by:'2018-08-27',
                returned_on:'2018-08-26',
                current: true
            },
            {
                book_id:10,
                patron_id:8,
                loaned_on:'2018-07-18',
                return_by:'2018-07-25',
                returned_on:'2018-07-24',
                current: true
            },
            {
                book_id:12,
                patron_id:9,
                loaned_on:'2018-08-13',
                return_by:'2018-08-20',
                returned_on:'2018-08-17',
                current: true
            },
            {
                book_id:4,
                patron_id:10,
                loaned_on:'2018-05-18',
                return_by:'2018-05-25',
                returned_on:'2018-05-24',
                current: false
            },
            {
                book_id:3,
                patron_id:12,
                loaned_on:'2018-04-23',
                return_by:'2018-04-30',
                returned_on:'2018-04-28',
                current: true
            },
            {
                book_id:7,
                patron_id:13,
                loaned_on:'2018-03-20',
                return_by:'2018-03-27',
                returned_on:'2018-03-27',
                current: true
            },
            {
                book_id:17,
                patron_id:14,
                loaned_on:'2018-02-19',
                return_by:'2018-02-26',
                returned_on:'2018-02-24',
                current: true
            },

        ]);

  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Loans', null, {});
  }
};
