'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Patrons', [
        {
            id:0,
            name:'Andrew Chalkley',
            address:'1234 NE 20st St',
            email:'andrew.chalkley@teamtreehouse.com',
            libraryId:'MCL1001',
            zip:'90210'
        },
        {
            id:1,
            name:'Dave McFarland',
            address:'5252 NW 2nd St<',
            email:'dave.mcfarland@teamtreehouse.com',
            libraryId:'MCL1010',
            zip:'90210'
        },
        {
            id:2,
            name:'Alena Holligan<',
            address:'1404 SW 101st St',
            email:'alena.holligan@teamtreehouse.com',
            libraryId:'MCL1100',
            zip:'91210'
        },
        {
            id:3,
            name:'Michael Poley',
            address:'7070 NE 10th Ave',
            email:'michael.poley@teamtreehouse.com',
            libraryId:'MCL1011',
            zip:'91310'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Patrons', null, {});
    */
  }
};
