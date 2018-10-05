'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
        {
            id:0,
            title:`Harry Potter and the Philosopher's Stone`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:1997
        },
        {
            id:1,
            title:`Harry Potter and the Chamber of Secrets`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:1998
        },
        {

            id:2,
            title:`Harry Potter and the Prisoner of Azkaban`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:1999
        },
        {
            id:3,
            title:`Harry Potter and the Goblet of Fire`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:2000
        },
        {
            id:4,
            title:`Harry Potter and the Order of the Phoenix`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:2003
        },
        {
            id:5,
            title:`Harry Potter and the Half-Blood Prince`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:2005
        },
        {
            id:6,
            title:`Harry Potter and the Deathly Hallows`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:2007
        },
        {
            id:7,
            title:`A Brief History of Time`,
            author:'Stephen Hawking',
            genre:'Non Fiction',
            first_published:1988
        },
        {
            id:8,
            title:`The Universe in a Nutshell`,
            author:'Stephen Hawking',
            genre:'Non Fiction',
            first_published:2001
        },
        {
            id:9,
            title:`Frankenstein`,
            author:'Mary Shelley',
            genre:'Horror',
            first_published:1818
        },
        {
            id:10,
            title:`The Martian`,
            author:'Andy Weir',
            genre:'Science Fiction',
            first_published:2014
        },
        {
            id:11,
            title:`Ready Player One`,
            author:'Ernest Cline',
            genre:'Science Fiction',
            first_published:2011
        },
        {
            id:12,
            title:`Armada`,
            author:'Ernest Cline',
            genre:'Science Fiction',
            first_published:2015
        },
        {
            id:13,
            title:`Pride and Prejudice`,
            author:'Jane Austen',
            genre:'Classic',
            first_published:1813
        },
        {
            id:14,
            title:`Emma`,
            author:'Jane Austen',
            genre:'Classic',
            first_published:1815
        }
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
