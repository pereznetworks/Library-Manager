'use strict';
// dont forget to update dates in this seed data to current dates before submit...
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Loans', [
            {
                book_id:15,
                patron_id:2,
                loaned_on:'2015-12-10',
                return_by:'2020-10-20',
                returned_on:'',
            },
            {
                book_id:4,
                patron_id:1,
                loaned_on:'2015-12-11',
                return_by:'2015-12-18',
                returned_on:'',
            },
            {
                book_id:8,
                patron_id:1,
                loaned_on:'2015-12-12',
                return_by:'2015-12-19',
                returned_on:'',
            },
            {
                book_id:9,
                patron_id:3,
                loaned_on:'2015-12-13',
                return_by:'2015-12-20',
                returned_on:'',
            },
            {
                book_id:11,
                patron_id:4,
                loaned_on:'2015-12-13',
                return_by:'2015-12-20',
                returned_on:'2015-12-17',
            },
        ]);

  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Loans', null, {});
  }
};
