'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Loans', [
            {
                book_id:14,
                patron_id:1,
                loaned_on:'2015-12-10',
                return_by:'2020-10-20',
                returned_on:'',
            },
            {
                book_id:3,
                patron_id:0,
                loaned_on:'2015-12-11',
                return_by:'2015-12-18',
                returned_on:'',
            },
            {
                book_id:7,
                patron_id:0,
                loaned_on:'2015-12-12',
                return_by:'2015-12-19',
                returned_on:'',
            },
            {
                book_id:8,
                patron_id:2,
                loaned_on:'2015-12-13',
                return_by:'2015-12-20',
                returned_on:'',
            },
            {
                book_id:10,
                patron_id:3,
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
