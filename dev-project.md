## Below are the initial project development notes I wrote as I worked on this project
  - much of this just me thinking out-loud

## Contents
- [Project Update 31](#project-update-31)
- [Project Update 30](#project-update-30)
- [Project Update 29](#project-update-29)
- [Project Update 28](#project-update-28)
- [Project Update 27](#project-update-27)
- [Project Update 26](#project-update-26)
- [Project Update 25](#project-update-25)
- [Project Update 24](#project-update-24)
- [Project Update 23](#project-update-23)
- [Project Update 22](#project-update-22)
- [Project Update 21](#project-update-21)
- [Project Update 20](#project-update-20)
- [Project Update 19](#project-update-19)
- [Project Update 18](#project-update-18)
- [Project Update 17](#project-update-17)
- [Project Update 16](#project-update-16)
- [Project Update 15](#project-update-15)
- [Project Update 14](#project-update-14)
- [Project Update 13](#project-update-13)
- [Project Update 12](#project-update-12)
- [Project Update 11](#project-update-11)
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

## Project Update 31

DONE:

  During final walk-through:

    added data to demonstrate pagination across loans, patrons and books

    fixed variable declaration typo in patrons route

    fixed new loan checked-out books in drop-menu bug:

      includes updates to new loan form and loan post route
      see update 25...

  Project Extra Credit Features:

     Pagination for Books, Loans and Patrons page

     Search for Books and Patrons

  Project Expectations:

      Models
        Books, Loans and Patrons
        Model Associations

      Home Screen
        All links load appropriate route and viewe

      Navigation
        Nav bar available from every part of app

      Books Page
        The following pages work as required
          Book Listings Page
          Add a New Book
          Book Details Page

      Loans Page
        The following pages work as required
          Loan Listings Page
          New Loan Page

      Return Book Page
        Is launched using the 'Return Book' button,
          from Patron detail, Loan detail and Book detail

      Patron Listing Page
        The following pages work as required
          Patron Detail Page
          New Patron Page

      Input and Form Validation
        for required fields and forms...
        validation built into model attributes
        polite 'this field is required' messages

## Project Update 30

  implemented custom unique model attribute datatype/validation

    for Library id and for email

## Project Update 29

  Patron Update form

    correct page rendered after update submitted

    entire patron detail re-rendered correctly on validation errors

    placeholder values remind user what was there before

    values insert user's submitted data

    user can clear the library_id, but it is still auto-populated


## Project Update 28

  Added model validation for all dates to Loan model

  Added error messages to for date validation to new loan and return book form

  Fixed both forms so that on submit the loans listing page is loaded

## Project Update 27:

  Removed logic to prevent already loaned books from being in new loans book select menu

## Project Update 26:

  fixed book detail update form error validation

## Project Update 25:

  fixed New Loan form and new Loan post route

      Loaned out books no longer appear in drop-down menu
        new loan form route test for current == true
          and returned_on !== null

      new Loan post route
          updates field, current = true
            where book_id of loan = book_id
              then creates new loan and has field of current = true

              note: when not using input from form, a.k.a req.body
                have to build an object with updated fields
                  and use a where clause to tell update
                    which record to update

                    ```
                      db.Loans.update(
                       {current: false},
                       {where: {
                                 book_id: req.body.book_id
                               }
                       }
                    ).then()

                    ```
              in future releases of this project
                need to explore using model instances
                  so I can set and save instead of a bulk update

## Project Update 24:

  Extra Credit Feature: Search - for Books and Patrons

    Search input form integrated into layout template

      Books search route working, using same view as Books main page

      Patrons search route working, using same view as patrons main page

      Search is not case-sensitive,

      good for partial matches on patrons and books main table

      no Loans search for now

      added a search title, so it's clear when viewing search results

## Project Update 23:

  Extra Credit Feature: Pagination - for Books, Patrons and Loans

    Using jquery and front-end css/javascript to due actual pagination links

    On server-side:

    wrote and added a paginate method to my utils library

    made changes to book, loan and patron table template to....

      implement pagination in the way the table on each page is displayed

      array of book, loans or patron data is processed into a pagesArray

        only if more than 10 rows will appear in a table

      otherwise normal process for 'tabling' of book, loans or patron data

    Nav bar for pagination links in footer of each main page,

      displays at bottom of page at all times

      is blank, no pagination links, if no pagination needed

      footer pagination nav bar runs full length section

    also fixed overdue and checked out books and loans

      using the same rules for both

       so both now display correct data

## Project Update 22:

  all forms and validation working

    no client side validation used
    all data is server side model-based validation

    forms submit data
    all fields validated
    records created in table correctly
    can update records

    in new loan form
        books and patrons menu work properly
        default option is the "please choose an option" field
          default options submits a null string
        date are auto-populated
          date input fields are actually hidden
          dates displayed in span elements that look like input fields

    in return book/loan form
        return date are auto-populated
          date input field is hidden
          date displayed in span elements that look like input fields

    new patron and update patron
        address and email get additional validation
          in addition to notEmpty, format checking also
        libraryId gets same treatment as date field
          autopopulated, hidden input, displaying span tag
        zip code get is isNumberic validation

    book patron
        this works also
        all fields get notEmpty validation
        year published get isNumberic validation

    cannot set a derived-attribute when a record is being created

      the real attribute it's based on does'nt exist yet
       so cannot set library_id, using a setter based on id of the new record
          cause there is no id yet.... !?@#$%

      also there does not seem to a method for ...
        custom alphanumeric auto-incremented primary key

      did some input field custom styling



## Project Update 21:

  Create and Update for Patron, Books and Loans DONE

    can create new patron, new loan and new book

    can update patron and book and loan, which is return book

    return book action button now reusable

## Project Update 20:

  first create op complete !

  can create a new loan and add to loans table
    then can access that loan via book, patron and loan details
    verified dataValues, book_id, patron_id
      and pre-calc'ed dates saved correctly

  when creating a new loan and adding to the loan table...
   sequelize initializes the returned_on field as null when empty,
    changed seed data to match this
     and changed all evaluations of returned_on field
       test for == null instead of length == 0

## Project Update 19:

   MILESTONE #1

   DONE with all Routes and Views that need Read in db C.R.U.D. ops

   All Views in place and working

   ... just need to implement the Create, Update and Delete methods

## Project Update 18:

  Drop down menus in 'New Loan' form now driven by ...

    Promise.all([db.Patrons.findAll(), db.Books.findAll()])...

  Which brings up some crazy options for handling other queries...

    may go back and refactor the book/patron detail views and loans table lookups

## Project Update 17:

  Overdue and Checked Out filter working for both Loans and Books

    testing if Date.now() > new Date(return_by) and returned_on.length == 0

    available from Home pg as well

## Project Update 16:

  Handling case where a book or a patron has no loan history

    required: false set on included model

    no need for this in loan page
      since loan table only displays row from loan table
      plus even href links to book and patron
       will be for those that have a loan history

## Project Update 15:

  Overdue and Checked Out Books filters working

## Project Update 14:

  all loans table view working:

  used a patrons.FindAll, include loans, include Books

  which yields an array, each item is a book, it's loan detail and patron  

  then used a filter array iteration to return only books item.Loan != null

## Project Update 13:

  correct when Return Book action button appears
    if returned_on.length != 0

## Project Update 12:

  had do a HARD DB reset, ..see [Developer Notes](#developer-notes)
    but did get Date Formatting of seed data in loans table fixed
    use DATATYPES. or Sequelize.DATEONLY for yyyy-mm-dd dates ie... 2018-10-11

## Project Update 11:

  FINALLY!!!

  book and patron table associations (joins) now working

  see [Project Status](#project-status) for details

  patron and book detail views complete


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

  Before starting:

  I did indeed downloaded the project files

[For the original project files and instructions ](https://github.com/pereznetworks/TD-Project10/tree/master/project-file-library-manager-v1)

  Read, studied and created my own markdown-style version of the project instructions

  Created this markdown-style   project readme to track and document my progress through this project.

  Will eventually be a how-to for developers and other students...
  who want to clone, download and work on their version of this project.

  [back to Content Menu](#contents)
