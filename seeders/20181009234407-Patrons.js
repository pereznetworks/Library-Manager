'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Patrons', [
        {
            first_name:'Andrew',
            last_name:'Chalkley',
            address:'1234 NE 20st St',
            email:'andrew.chalkley@teamtreehouse.com',
            library_id:'MCL1001',
            zip_code:'90210',
        },
        {
            first_name:'Dave M',
            last_name:'Farland',
            address:'5252 NW 2nd St',
            email:'dave.mcfarland@teamtreehouse.com',
            library_id:'MCL1010',
            zip_code:'90210',
        },
        {
            first_name:'Alena ',
            last_name:'Holligan',
            address:'1404 SW 101st St',
            email:'alena.holligan@teamtreehouse.com',
            library_id:'MCL1100',
            zip_code:'91210',
        },
        {
            first_name:'Michae',
            last_name:' Poley',
            address:'7070 NE 10th Ave',
            email:'michael.poley@teamtreehouse.com',
            library_id:'MCL1011',
            zip_code:'91310',
        }
      ], {
             timestamps: false
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Patrons', null, {});
  }
};
