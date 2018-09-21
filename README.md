# TD-Project10: Build a Library Manager

## Contents:
  - [Project Summary and Context](#project-summary-and-context)
  - [Before You Start](#before-you-start)
  - [Resouce Links](#resource-links)
  - [Project Instructions](#project-instructions)
    - [Models](#models)
    - [Home Screen](#home-screen)
    - [Navigation](#navigation)
    - [Book Listing Page](#book-listing-page)
    - [Add a New Book](#add-a-new-book)
    - [Book Details Page](#book-details-page)
    - [Load Listing Page](#load-listing-page)
    - [New Load Page](#new-load-page)
    - [Return Book Page](#return-book-page)
    - [Patron Listing Page](#patron-listing-page)
    - [Patron Detail Page](#patron-detail-page)
    - [New Patron Page](#new-patron-page)
    - [Required field and Forms](#required-field-and-forms)
  - [Extra Credit](#extra-credit)

# Project Summary and Context

    You've been tasked with creating a library management system
     for a small library.

    The librarian has been using a simple sqlite database
     and has been entering data in manually.

    The librarian wants a more intuitive way
     to handle the library's books, patrons and loans.

    You'll be given static HTML designs,
     a set of requirements and the existing SQLite database.

    You'll be required to implement a dynamic website
     using Express, Pug, and the SQL ORM Sequelize.

  [back to Content Menu](#contents)

# Before you start

    To prepare for this project
     you'll need to make sure you complete and understand these steps.

    2 steps:

    Download the project files.

      We've supplied several files for you to use:
      Use the library.db as the source of your data

**the original project files are found in this repo, folder path:**

 __./project-files-library-manager-v1__**


    HTML mockups and CSS files.

      These will be the basis of..
        the use cases described in the project instructions.

      Note:
       Install sequelize using the sequelize CLI.
       You’ll find a link to the documentation
       and to a Treehouse workshop in the project resources.

  [back to Content Menu](#contents)

## Resource Links

  - [Using Sequelize with Express, Workshop](https://sequelize.readthedocs.io/en/1.7.0/articles/express/)

  - [Install and Use Sequelize CLI](https://teamtreehouse.com/library/install-and-use-sequelize-cli)

  - [Sequelize CLI](http://sequelize.readthedocs.io/en/1.7.0/docs/migrations/)

  - [Sequelize Documentation - Adding/removing timestamps from definitions](http://sequelize.readthedocs.io/en/1.7.0/docs/models/#configuration)

  - [Sequelize Documentation - Validations](http://sequelize.readthedocs.io/en/latest/docs/models-definition/#validations)

  - [Sequelize Table Associations](http://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/)

  - [Sequelize Documentation - Model associations](http://sequelize.readthedocs.io/en/1.7.0/docs/associations/)

  - [Sequelize Documentation - Pagination and Li](http://sequelize.readthedocs.io/en/latest/docs/querying/#pagination-limiting)

## Project instructions

    To complete this project, follow the instructions below.
     If you get stuck, ask a question in the community.

  [back to Content Menu](#contents)

## Models:

    The library.db file should contain 3 tables.

    Create a Sequelize model for...
    a books table, patrons table, a loans table.
    There are no timestamps.

    The books table should have the following columns:
    id (integer),
    title (string),
    author (string),
    book genre (string),
    first_published(integer).

    The patrons table should have the following columns:
    id an integer,
    first_name (string),
    last_name (string),
    address (string),
    email (string),
    library_id (string)
    zip_code ( integer).

    The loans table should have the following columns:
    id (integer),
    book_id (integer),
    patron_id (integer),
    loaned_on (date),
    return_by (date),
    returned_on (date).

  [back to Content Menu](#contents)

## Home Screen:

    As a librarian, I should have a home screen so I can...
    access functionality easily with a single click.

    See home.html for an example.

    The home screen should include links to all of the following pages:
    Books:
    New Book
    List All
    List Overdue
    List Checked Out

    Patrons:
    New Patron
    List All
    Loans
    New Loan
    List All
    List Overdue
    List Checked Out

    NOTE: You should use Pug to render your views for this project.
    Avoid using a front end framework such as Angular.js.

  [back to Content Menu](#contents)

## Navigation:

    As a librarian, I should be able to access..
    a main navigation menu from every page of my application.
    The navigation should include links to..

     the Books Listing page (all_books.html),

     the Patrons Listing page (all_patrons.html)

     the Loans Listing page (all_loans.html)

      so I can view this information.
      See navigation on all pages for examples.

  [back to Content Menu](#contents)

## Books Listing Page:

    As a librarian, I should be able to filter books...
     by ‘all’ , ‘overdue’ and ‘checked out’ status on the Books Listing Page
      so I can quickly see the state of the library.
     Examples: all_books.html, overdue_books.html and checked_books.html.
     Include a button to create a new book.

    Display a table of books with the following columns:
      Book Title
      Author
      Genre
      Year Released/First Published
      Table should include the following links:
      Book titles should link to the book's detail page.
      Add a New Book

    As a librarian, I should be able to add a book to the database...
     so that they can be tracked on the system.
     Example: new_book.html.

    Display a form that allows the user to add a book,
     with the following input fields:
      Title (required)
      Author (required)
      Genre (required)
      First Published (optional)

      When the form is submitted successfully,
      the book is created in the database,
      user is redirected to the Books Listing Page
       and the book appears in the list with updated information.

      When form labels are clicked,
       they should bring focus to corresponding input.

      An error is displayed if the form is...
       submitted with blank or invalid data in required fields.
       For example: “This field is required.”

      To keep your DB safe,
       use Sequelize model validation for validating your from fields.
       Don't rely simply on HTML5 built in validation.

  [back to Content Menu](#contents)

## Book Detail Page:

    As a librarian, I should be able to go to a book’s detail page,
     make edits and view its loan history.
     Example book_detail.html.

    Display a form allowing the user to update the book,
     with the following input fields:
      Title (required)
      Author (required)
      Genre (required)
      First Published (optional)

    When the form is submitted successfully,
     the book is updated in the database,
      user is redirected to the Books Listing Page
       and the book appears in the list with updated information.

    When form labels are clicked,
     they should bring focus to corresponding input.

    An error is displayed if the form is...
     submitted with blank or invalid data in required fields.
      For example: “This field is required.”

    To keep your DB safe,
     use Sequelize model validation for validating your from fields.
      Don't rely simply on HTML5 built in validation.

    Display a Loan History table with the following columns:
      Book
      Patron
      Loaned on
      Return by
      Returned on
      Action

    Table should include the following links:
      The “Book” field links to the book.

    The “Patron” field links to the patron who checked out the book.
      If the book is checked out,
        the “Action” column contains a link/button to return the book.

  [back to Content Menu](#contents)

## Loan Listing Page:

    As a librarian, I should be able to filter loans by...
       “All”, “Overdue”, and “Checked Out”,
        so I can quickly see the state of the loan.
      Examples all_loans.html, overdue_loans.html and checked_loans.html.

    Include a button that links to the New Loan Page.

    Display a table of loans with the following columns:
      Book title
      Patron
      Loaned on
      Return by
      Returned on
      Action

    Table should include the following links:
      The “Patron” field links to the patron who checked out the book.
      The “Book title” field links to the book.
      If the book is checked out,
       the “Action” column contains a link/button to return the book.

  [back to Content Menu](#contents)

## New Loan Page:

    As a librarian, I should be able to check out a book
     so I can lend books to patrons. Example new_loan.html.

    Display a form allowing the user to update the Loan,
     with the following input fields:
      Book_ID (required)
      Patron_ID (required)
      Loaned_on (required)
      Return_by (required)

    The patron and book fields should be select boxes...
     where you can select the Patron_ID or Book_ID.

    The Loaned_on field should be auto populated with today’s date.
     Example: 2016-10-20.
     The returned by date should also be pre-populated with...
      a date 7 days in the future, for example: 2016-10-27.

    When the form is submitted successfully,
     a loan is created in the database
      and the user should be redirected to the loan listing page,
       where updated info should be visible.

    When form labels are clicked,
     they should bring focus to corresponding input.

    An error is displayed if the form is...
     submitted with blank or invalid data in required fields.
      For example: “This field is required.”

    To keep your DB safe,
     use Sequelize model validation for validating your from fields.
      Don't rely simply on HTML5 built in validation.

  [back to Content Menu](#contents)

## Return Book Page:

    As a librarian, I should be able to return a book...
     so we know the current state of a book in our library. Example:return_book.html.

    Display book title, patron who borrowed the book...
     the loaned on and return by dates.

    Include one required returned_on form field.
     It should be pre-populated with today’s date.
      Example: 2016-10-20.

    Include a button to return the book.

    When the form is submitted successfully,
     the book should be updated in the database
      and the user should be redirect to the loans listing page,
       where updated info should be visible.

    When form labels are clicked,
     they should bring focus to corresponding input.

    An error is displayed if the form is
     submitted with blank or invalid data in required fields.
      For example: “This field is required.”

    To keep your DB safe,
     use Sequelize model validation for validating your from fields.
      Don't rely simply on HTML5 built in validation.

  [back to Content Menu](#contents)

## Patron Listing Page:

    As a librarian, I should be able to list all patrons
     so I can find and access library-goers easily.
      Example: all_patrons.html.

    Include a button to create a new patron.

    Display a table of Patrons with the following columns:
      Name
      Address
      Email
      Library ID
      Zip Code

    Table should include the following links:
      Names should link to that patron's detail page.

  [back to Content Menu](#contents)

## Patron Detail Page:

    As a librarian, I should be able to go to a patron's detail page,
     make edits and view their loan history.
      Example patron_detail.html.

    Display a form for listing patron’s information
     with the following required fields:
      First Name
      Last Name
      Address
      Email
      Library ID
      Zip Code

    When the form is submitted successfully,
     the patron should be updated in the database
      and the user should be redirected to the patron page,
       where updated info should be visible.

    When form labels are clicked,
     they should bring focus to corresponding input.

    An error is displayed if the form is
     submitted with blank or invalid data in required fields.
      For example: “This field is required.”

    To keep your DB safe,
     use Sequelize model validation for validating your from fields.
      Don't rely simply on HTML5 built in validation.

    Display a Loan History table for current patron
     with the following columns:
      Book
      Patron
      Loaned on
      Return by
      Returned on
      Action

    Table should include the following links:
      Books should link back to the book detail page.
      Patron’s name links to the corresponding patron detail page.
      If the book is checked out,
       the “Action” column contains a link/button to return the book.

  [back to Content Menu](#contents)

## New Patron Page:

    As a librarian, I should be able to create new library patrons
     so they can use the facilities.
      Example: new_patron.html.

    Display a form for listing patron’s information
     with the following required fields:
      First Name
      Last Name
      Address
      Email
      Library ID
      Zip Code

    When the form is submitted successfully,
     a patron should be created in the database
      and the user should be redirected to the patrons listing page,
       where updated info should be visible.

    When form labels are clicked,
     they should bring focus to corresponding input.

    An error is displayed if the form is
     submitted with blank or invalid data in required fields.
      For example: “This field is required.”

    To keep your DB safe,
     use Sequelize model validation for validating your from fields.
      Don't rely simply on HTML5 built in validation.

    Required fields and Forms

    As a librarian, I should be able to be notified if
     any of the required fields in any given form have any missing data,
      so that I can correct the information.

    For example,
     if the first name field is empty on the new patron form
      and the librarian submits it,
       the librarian should see: “First Name is required”.

    To keep your DB safe,
     use Sequelize model validation for validating your from fields.
      Don't rely simply on HTML5 built in validation.

    When form labels are clicked,
     they should bring focus to corresponding input.

  [back to Content Menu](#contents)

## Extra Credit:

    To get an "exceeds" rating,
    you can expand on the project in the following ways:

    Exceeds Feature 1:

      Include pagination for both the patrons listing and books listing pages.

    Exceeds Feature 2:

      Include search fields for both the patrons listing and books listing pages.

        Examples:
        first_name, last_name,library_id, etc for patrons
        title, author, genre, etc for books

        NOTE: Searching should be...
               case insensitive
               and be good for partial matches for strings.

  [back to Content Menu](#contents)
