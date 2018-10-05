
/* TODO:  in the models folder
   add the following code to the model definitions
   replace the sequelize.define statement with these
   for each table, books, patrons and loans
*/


/* The library.db file should contain 3 tables.
    Create a Sequelize model for a
    books table, a patrons table, and a loans table.
    NOTE: There are no timestamps.
*/

/* normal way to create models
   node_modules/.bin/sequelize model:create --name books --attributes title:STRING,author:STRING,genre:STRING,first_published:INTEGER
   node_modules/.bin/sequelize model:create --name patrons --attributes first_name:STRING,last_name:STRING,address:STRING,email:STRING,library_id:STRING,zip_code:INTEGER;
   node_modules/.bin/sequelize model:create --name loans --attributes book_id:INTEGER,patron_id:INTEGER,loaned_on:DATE,return_by:DATE,returned_on:DATE

    but apparently there is no way to indicate to sequelize-cli not to use timestamps
     so....have to use sequelize.define instead...
*/

const books = sequelize.define('books', {
               id: sequelize.INTEGER,
            title: sequelize.STRING,
           author: sequelize.STRING,
            genre: sequelize.STRING,
  first_published: sequelize.INTEGER
},{
       timestamps: false
});

/* Once books model created
    a books table is also created
     and should have the following columns:
      id an integer,
      title a string,
      author a string,
      genre a string
      first_published an integer.
*/

const patrons = sequelize.define('patrons', {
              id: sequelize.INTEGER,
      first_name: sequelize.STRING,
       last_name: sequelize.STRING,
         address: sequelize.STRING,
           email: sequelize.STRING,
      library_id: sequelize.STRING,
        zip_code: sequelize.INTEGER
},{
      timestamps: false
});

/* Once patrons model created
    a patrons table is also created
     and should have the following columns:
      id an integer,
      first_name (string),
      last_name (string),
      address (string),
      email (string),
      library_id (string)
      zip_code ( integer).
*/

const loans = sequelize.define('loans', {
               id: sequelize.INTEGER,
          book_id: sequelize.INTEGER,
        patron_id: sequelize.INTEGER,
        loaned_on: sequelize.DATE,
        return_by: sequelize.DATE,
      returned_on: sequelize.DATE
},{
       timestamps: false
});

/* Once loans model created
    a loans table is also created
     and should have the following columns:
      id (integer),
      book_id (integer),
      patron_id (integer),
      loaned_on (date),
      return_by (date)
      returned_on (date).
*/
