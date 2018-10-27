'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Patrons', [
        {
            first_name:'Andrew ',
            last_name:'Chalkley',
            address:'1234 NE 20st St',
            email:'andrew.chalkley@teamtreehouse.com',
            library_id:'MCL0101',
            zip_code:'90210',
        },
        {
            first_name:'Dave ',
            last_name:'McFarland',
            address:'5252 NW 2nd St',
            email:'dave.mcfarland@teamtreehouse.com',
            library_id:'MCL0102',
            zip_code:'90210',
        },
        {
            first_name:'Alena ',
            last_name:'Holligan',
            address:'1404 SW 101st St',
            email:'alena.holligan@teamtreehouse.com',
            library_id:'MCL0103',
            zip_code:'91210',
        },
        {
            first_name:'Michael ',
            last_name:' Poley',
            address:'7070 NE 10th Ave',
            email:'michael.poley@teamtreehouse.com',
            library_id:'MCL0104',
            zip_code:'91310',
        },
        {
            first_name:'Andrew ',
            last_name:'Davis',
            address:'1234 NE 19st St',
            email:'andrew.chalkley@teamtreehouse.com',
            library_id:'MCL0105',
            zip_code:'90215',
        },
        {
            first_name:'Dave',
            last_name:'McNea rland',
            address:'2525 NE 2nd St',
            email:'dave.mcnearland@teamtreehouse.com',
            library_id:'MCL0106',
            zip_code:'90317',
        },
        {
            first_name:'Alena ',
            last_name:'Smith',
            address:'1909 SW 104st St',
            email:'alena.smith@teamtreehouse.com',
            library_id:'MCL0107',
            zip_code:'91518',
        },
        {
            first_name:'Michael ',
            last_name:'Short',
            address:'8080 NE 14th Ave',
            email:'michael.Short@teamtreehouse.com',
            library_id:'MCL0108',
            zip_code:'91312',
        },
        {
            first_name:'Andy ',
            last_name:'Smart',
            address:'5678 NE 21st St',
            email:'andy.smart@teamtreehouse.com',
            library_id:'MCL0109',
            zip_code:'90230',
        },
        {
            first_name:'John ',
            last_name:'Walter',
            address:'8282 NW 2nd St',
            email:'john.walter@teamtreehouse.com',
            library_id:'MCL0110',
            zip_code:'90211',
        },
        {
            first_name:'Mary ',
            last_name:'Fieldman',
            address:'1607 NW 101st St',
            email:'mary.fieldman@teamtreehouse.com',
            library_id:'MCL0111',
            zip_code:'91232',
        },
        {
            first_name:'Darrin ',
            last_name:' Micheal',
            address:'91 NE 18th Ave',
            email:'darrin.michael@teamtreehouse.com',
            library_id:'MCL0112',
            zip_code:'91310',
        },
        {
            first_name:'Mandy ',
            last_name:'White',
            address:'8100 1st St',
            email:'mandy.white@teamtreehouse.com',
            library_id:'MCL0113',
            zip_code:'90211',
        },
        {
            first_name:'Allen ',
            last_name:'Davis',
            address:'3010 NW 2nd St',
            email:'allen.davis@teamtreehouse.com',
            library_id:'MCL0114',
            zip_code:'90215',
        },
        {
            first_name:'Daniel ',
            last_name:'Solomon',
            address:'1860 Green St.',
            email:'daniel.solomon@teamtreehouse.com',
            library_id:'MCL0115',
            zip_code:'91210',
        },
        {
            first_name:'Ali',
            last_name:' Khan',
            address:'871 Morris Ave.',
            email:'ali.khan@teamtreehouse.com',
            library_id:'MCL0116',
            zip_code:'91310',
        }

      ]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Patrons', null, {});
  }
};
