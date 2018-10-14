# TD-Project10: Build a Library Manager

## Contents:
  - [For Project Reviewer](#for-the-project-reviewer)
  - [Project Progress](#project-progress)
  - [Issues and Challenges](#issues-and-challenges)
  - [Project Updates](#project-updates)
    - [Project Update 10](#project-update-10)  
    - [Project Update 9](#project-update-9)
    - [Project Update 8](#project-update-8)
    - [Project Update 7](#project-update-7)
    - [Project Update 6](#project-update-6)
    - [Project Update 5](#project-update-5)
    - [Project Update 4](#project-update-4)
    - [Project Update 3](#project-update-3)
    - [Project Update 2](#project-update-2)
    - [Project Update 1](#project-update-1)
  - [For the original project files and a project instruction, follow this link](https://github.com/pereznetworks/TD-Project10/tree/master/z-project-files-library-manager-v1)

# For the Project Reviewer

  This section will eventually contain any instructions and comments...
   the project reviewer will need to
      make it easier to review and grade the project.

  [back to Content Menu](#contents)

## Project Status

  DONE:
        basic express app, routing and Sequelize environment setup
        library db and table models

        re-factored templates for home, books, patrons and loans page views
            along with 'show all' for books, patrons and loans

        re-factored templates for Loan, Book, Patron details

        re-factor templates for
          createNewForm page for new books, patrons and loans
          return book form page from Books, Patrons and Loans page
          and updateForm as well

        table/model associations working
          db.Books.hasOne(db.Loans);
          db.Loans.belongsTo(db.Books);
          db.Loans.belongsTo(db.Patrons);
          db.Patrons.hasMany(db.Loans);

        patrons/patron_detail/:id view
        book/book_detail/:id view
          now returning and display loans and book data for that patron
            can be is accessed from home book, loan and patron pg
            displaying book title, patron names
             plus links for each are the routes needs to get detail on each

  DOING:

        using Sequelize models to create, read, update, delete (CRUD) the data

          currently working on R in CRUD

          loans table on main loan page
          - is actually an 'all' loans detail table

            will fix the 'invalid dates' when working on input validation

  NEXT:

         queries/views and/or associations for filtering loans and books table

         submit actions for create, update and return books page

         input validation for each form and implementing error pages

         modify forms as queries and/or associations are tested and working

  TODO:
         verify each view, table and form perform to project speqs

         verify project speqs across project

  [back to Content Menu](#contents)

## Issues and Challenges:

  Lots pages and subpages in the html-mockup
    meaning lots of components and sub-components

  Will need to make sure I don't make the routing over-complicated

  UI and UI-controls will need change based on context of data presented

  This is an Express.js app
    Sequelize for data
      Pug for html rendering
        with http server npm module  

  Sequelize v4 is different from the v3 demo'ed in the Sequelize/Node.js workshop
    compelted the workshop using both
      will use as model to make sure Sequelize v4 syntax and methods used in this app

  Not Using sample library.db the came with project files
    seems to work only with seqeulize v3
    simply: Express app runs sequelize bootstrapped code
      which uses config file and creates a new libary.db in none exists

  Model associatons, finally got the right mix
    may need more as I get into filtering queries for overdue and checked-out
    
  [back to Content Menu](#contents)

## Project Updates:

  Project Updates list from most recent update to oldest

  [back to Content Menu](#contents)

## Project Update 11:

  book and patron table associations (joins) now working

  got table/model associations to work

  patrons/patron_detail/:id view complete

## Project Update 10:

  Can now load all views and forms with data from library.db tables

  now to implement associations - to replace \_id's with values referenced
    like book_id = 'Book Title'

  also to handle querying for data across multiple tables

  simpler pug templated means having more of these but way easier to maintain

## Project Update 9:

  Seeders now work.
    express app, using sequelize's bootstrapped views/index.js
      creates a new emopty library.db with tables using models
    then exit the app
    run sequelize db:seed
      and with the right syntax in seeder js files
        was able to seed sample data into database

  Verified that am able to do R in CRUD
    able to do findAll, findOne on Books and Loans table

  Now to handle a few issues

    need valid dates in a book's loan details

    how to make sure ...
      to not try to get loan detail of book that has none
      or give msg to that affect ...
      and give choice to create a loan for that book

    create a table view using mutli-table query for...
    the different filter and options and detail table views

  Finally, !!!
    Now can start building method for CRUD operations

## Project Update 8:

After much TROUBLEshooting....
  Not Using sample library.db the came with project files
    seems to work only with Sequelize v3
  Since I am using Sequelize v4 in this project...

Solution is simple:
    Express app starts, runs Sequelize bootstrapped code
      which uses config file and creates a new library.db in none exists
      then am able to do CRUD and display from tables in library.db

Re-factor of all pug templates
Overall UI flow the same
  Result is...
    separate folder for each section:
      folder of templates for
        bookViews, loanViews and patronViews
        in addition to returnBookViews
      more but simpler, static templates
      little or no calculation and/or javascript code
  re-factor allows...
      to more easily work with Sequelize's SQlite data,
      provides better performance,
      code is easier to understand and is more maintainable.

## Project Update 7:

  over-all library manager UI flow:

  from books page
    clicking on the book title
      send book id in url
    book detail will use param.id
      to show book's update form and loan history of that book

    will be able to
      filter show all books table by overdue and checked out books

  from patrons page
    clicking on the patron name
      send patron id in url
    patron detail will use param.id
     to show patron's update form and loan history of that patron

  from loans page
    can access both book and patron detail

    will be able to
      filter show all books table by overdue and checked out books

  at end of each row in books/patrons/loans table
    and book/patron detail
    and filtered table     

    action column will have "return book"
      if the returned-on column has no entry

   'return book' action button loads the return book form page
      will need to return to page loaded from

## Project Update 6:

  Home, Books, Patrons and Loans pages rendering complete  

  verified variables in views/local.js needed to render each main page

  verified modular pug template, table.pug works for ...
    to show all books. loans and patrons

  adding code comments
## Project Update 5:

  Basic routing for Home, Books, Patrons and Loans page
    added views/locals.js
      exporting object for each main page
        to keep router code DRY, modular and simple

## Project Update 4:

  created Sequelize models for Book, Patrons and Loans
  added require to routes

## Project Update 3:

  Environment Setup

  - Step 1: Express generator:

    - npm install install express express-generator

    - node_modules/.bin/express . -f

  - Step 2: Sequelize setup:

    - npm sequelize sqlite3 sequelize-cli

  - Step 3: Replaced deprecated packages:

    - removed transformers@2.1.0, installed

      - npm install --save jstransformer

    - upgraded constantinople@3.0.2 to

      - npm install --save constantinople@3.1.1

    - removed jade@1.11.0, installed

      - npm install --save pug

    - initialzed sequelize

      - node_modules/.bin/sequelize init

    - added sequelie require sequelize sync to .bin/www

  [back to Content Menu](#contents)

## Project Update 2:

  Note: need to keep in mind differences between [Sequelize v3 to v4](http://docs.sequelizejs.com/manual/tutorial/upgrade-to-v4.html)

  will need refer to my Sequelize workshop Blog example v3 and v4 for syntax and implementation differences

  making these a GitHub repo for easier reference and safe keeping

  [back to Content Menu](#contents)

## Project Update 1:

  Before You Start:

  I did indeed downloaded the project files

[For the original project files and a readme follow this link](https://github.com/pereznetworks/TD-Project10/tree/master/project-file-library-manager-v1)

  Read, studied and created my own markdown-style version of the project instructions

  Created this markdown-style   project readme to track and document my progress through this project.

  Will eventually be a how-to for developers and other students...
  who want to clone, download and work on their version of this project.

  [back to Content Menu](#contents)
