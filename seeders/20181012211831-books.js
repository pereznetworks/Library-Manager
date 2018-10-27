'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
        {
            title:"Harry Potter and the Philosopher's Stone",
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:1998
        },
        {
            title:`Harry Potter and the Chamber of Secrets`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:1998
        },
        {

            title:`Harry Potter and the Prisoner of Azkaban`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:1999
        },
        {
            title:`Harry Potter and the Goblet of Fire`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:2000
        },
        {
            title:`Harry Potter and the Order of the Phoenix`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:2003
        },
        {
            title:`Harry Potter and the Half-Blood Prince`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:2005
        },
        {
            title:`Harry Potter and the Deathly Hallows`,
            author:'J.K. Rowling',
            genre:'Fantasy',
            first_published:2007
        },
        {
            title:`A Brief History of Time`,
            author:'Stephen Hawking',
            genre:'Non Fiction',
            first_published:1988
        },
        {
            title:`The Universe in a Nutshell`,
            author:'Stephen Hawking',
            genre:'Non Fiction',
            first_published:2001
        },
        {
            title:`Frankenstein`,
            author:'Mary Shelley',
            genre:'Horror',
            first_published:1818
        },
        {
            title:`The Martian`,
            author:'Andy Weir',
            genre:'Science Fiction',
            first_published:2014
        },
        {
            title:`Ready Player One`,
            author:'Ernest Cline',
            genre:'Science Fiction',
            first_published:2011
        },
        {
            title:`Armada`,
            author:'Ernest Cline',
            genre:'Science Fiction',
            first_published:2015
        },
        {
            title:`Pride and Prejudice`,
            author:'Jane Austen',
            genre:'Classic',
            first_published:1813
        },
        {
            title:`Emma`,
            author:'Jane Austen',
            genre:'Classic',
            first_published:1815
        },
        {
            title:`To Kill a Mockingbird`,
            author:'Harper Lee',
            genre:'Modern Classic',
            first_published:1960
        },
        {
            title:`Animal Farm`,
            author:'George Orwell',
            genre:'Modern Classic',
            first_published:1945
        },
        {
            title:`A Tale of Two Cities`,
            author:'Charles Dickens',
            genre:'Classic',
            first_published:1859
        },
        {
            title:`Le Comte de Monte-Cristo`,
            author:'Alexandre Dumas',
            genre:'Classic',
            first_published:1844
        }
      ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
