// static variables to pass as locals to pug when rendering each page or sub-page
// sample data for development purposes
// will replace with sequelize sqlite3 db data

var homePg= {
  title: 'Welcome to Library Manager',
  booksTitle: 'Books',
  bookSectionId: 'bookSection',
  patronsTitle: 'Patrons',
  patronSectionId: 'patronSection',
  loansTitle: 'Loans',
  loanSectionId: 'loanSection'
};

var booksPg = {
  title: 'Books',
  createNewRoute: '/books/new',
  queryForAllRoute: '/books?filter=overdue',
  queryOverdueRoute: '/books?filter=checked_out',
  bookHrefPath:"/book/book_detail",
  columnArray: ['id', 'Title', 'Author', 'Genre', 'Year Published'],
  rowArray: [
      {
          id:0,
          titleArray:`Harry Potter and the Philosopher's Stone`,
          author:'J.K. Rowling',
          genre:'Fantasy',
          first_published:'1997',
      },
      {
          id:1,
          titleArray:`Harry Potter and the Chamber of Secrets`,
          author:'J.K. Rowling',
          genre:'Fantasy',
          first_published:'1998',
      },
      {

          id:2,
          titleArray:`Harry Potter and the Prisoner of Azkaban`,
          author:'J.K. Rowling',
          genre:'Fantasy',
          first_published:'1999',
      },
      {
          id:3,
          titleArray:`Harry Potter and the Goblet of Fire`,
          author:'J.K. Rowling',
          genre:'Fantasy',
          first_published:'2000',
      },
      {
          id:4,
          titleArray:`Harry Potter and the Order of the Phoenix`,
          author:'J.K. Rowling',
          genre:'Fantasy',
          first_published:'2003',
      },
      {
          id:5,
          titleArray:`Harry Potter and the Half-Blood Prince`,
          author:'J.K. Rowling',
          genre:'Fantasy',
          first_published:'2005',
      },
      {
          id:6,
          titleArray:`Harry Potter and the Deathly Hallows`,
          author:'J.K. Rowling',
          genre:'Fantasy',
          first_published:'2007',
      },
      {
          id:7,
          titleArray:`A Brief History of Time`,
          author:'Stephen Hawking',
          genre:'Non Fiction',
          first_published:'1988',
      },
      {
          id:8,
          titleArray:`The Universe in a Nutshell`,
          author:'Stephen Hawking',
          genre:'Non Fiction',
          first_published:'2001',
      },
      {
          id:9,
          titleArray:`Frankenstein`,
          author:'Mary Shelley',
          genre:'Horror',
          first_published:'1818',
      },
      {
          id:10,
          titleArray:`The Martian`,
          author:'Andy Weir',
          genre:'Science Fiction',
          first_published:'2014',
      },
      {
          id:11,
          titleArray:`Ready Player One`,
          author:'Ernest Cline',
          genre:'Science Fiction',
          first_published:'2011',
      },
      {
          id:12,
          titleArray:`Armada`,
          author:'Ernest Cline',
          genre:'Science Fiction',
          first_published:'2015',
      },
      {
          id:13,
          titleArray:`Pride and Prejudice`,
          author:'Jane Austen',
          genre:'Classic',
          first_published:'1813',
      },
      {
          id:14,
          titleArray:`Emma`,
          author:'Jane Austen',
          genre:'Classic',
          first_published:'1815',
      }
    ]
  };

var loansPg = {
  title: 'Loans',
  createNewRoute: '/loans/new',
  queryForAllRoute: '/loans?filter=overdue',
  queryOverdueRoute: '/loans?filter=checked_out',
  bookHrefPath:"/book/book_detail",
  patronHrefPath:"/patron/patron_detail",
  actionHrefPath:"/return/return_book",
  columnArray: ['id','Book', 'Patron', 'Loaned on', 'Return by', 'Returned on', 'Action'],
  rowArray: [
        {
            id:0,
            book:'Emma',
            patron:'Dave McFarland',
            loanedon:'2015-12-10',
            returnby:'2020-10-20',
            returnedon:' ',
            action:'Return Book'
        },
        {
            id:1,
            book:'Harry Potter and the Goblet of Fire',
            patron:'Andrew Chalkley',
            loanedon:'2015-12-11',
            returnby:'2015-12-18',
            returnedon:'',
            action:'Return Book'
        },
        {
            id:2,
            book:'A Brief History of Time',
            patron:'Andrew Chalkley',
            loanedon:'2015-12-12',
            returnby:'2015-12-19',
            returnedon:'',
            action:'Return Book'
        },
        {
            id:3,
            book:'The Universe in a Nutshell',
            patron:'Alena Holligan',
            loanedon:'2015-12-13',
            returnby:'2015-12-20',
            returnedon:'',
            action:'Return Book'
        },
        {
            id:4,
            book:'The Martian',
            patron:'Michael Poley',
            loanedon:'2015-12-13',
            returnby:'2015-12-20',
            returnedon:'2015-12-17',
            action:''
        },
    ]
  };

var patronsPg = {
    title: 'Books',
    createNewRoute: '/patrons/new',
    patronHrefPath:"/patron/patron_detail",
    columnArray: ['id','Name', 'Address', 'Email', 'Library ID', 'Zip'],
    rowArray: [
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
    ]
  };

module.exports.homePg = homePg;
module.exports.booksPg = booksPg;
module.exports.loansPg = loansPg;
module.exports.patronsPg = patronsPg;
