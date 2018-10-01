/* The library.db file should contain 3 tables.
    Create a Sequelize model for a
    books table, a patrons table, and a loans table.
    There are no timestamps.
*/

node_modules/.bin/sequelize model:create --name books --attributes id:INTEGER,title:STRING,author:STRING,genre:STRING,first_published:INTEGER

/* The books table should have the following columns:
    id an integer,
    title a string,
    author a string,
    genre a string
    first_published an integer.
*/

/* Output:

  Sequelize CLI [Node: 9.8.0, CLI: 4.1.1, ORM: 4.39.0]

  New model was created at /Users/danielperez/Dropbox/TechDegree/TD-Project10/models/books.js .
  New migration was created at /Users/danielperez/Dropbox/TechDegree/TD-Project10/migrations/20181001023222-books.js .
*/

node_modules/.bin/sequelize model:create --name patrons --attributes id:INTEGER,first_name:STRING,last_name:STRING,address:STRING,email:STRING,library_id:STRING,zip_code:INTEGER;

/* The patrons table should have the following columns:
    id an integer,
    first_name (string),
    last_name (string),
    address (string),
    email (string),
    library_id (string)
    zip_code ( integer).
*/

/* Output:
    Sequelize CLI [Node: 9.8.0, CLI: 4.1.1, ORM: 4.39.0]

    New model was created at /Users/danielperez/Dropbox/TechDegree/TD-Project10/models/patrons.js .
    New migration was created at /Users/danielperez/Dropbox/TechDegree/TD-Project10/migrations/20181001023204-patrons.js .
*/

node_modules/.bin/sequelize model:create --name loans --attributes id:INTEGER,book_id:INTEGER,patron_id:INTEGER,loaned_on:DATE,return_by:DATE,returned_on:DATE

/* The loans table should have the following columns:
    id (integer),
    book_id (integer),
    patron_id (integer),
    loaned_on (date),
    return_by (date)
    returned_on (date).
*/

/* Output:
    Sequelize CLI [Node: 9.8.0, CLI: 4.1.1, ORM: 4.39.0]

    New model was created at /Users/danielperez/Dropbox/TechDegree/TD-Project10/models/loans.js .
    New migration was created at /Users/danielperez/Dropbox/TechDegree/TD-Project10/migrations/20181001023256-loans.js .
*/
