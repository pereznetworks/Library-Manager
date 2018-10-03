# TD-Project10: Build a Library Manager

## Contents:
  - [For Project Reviewer](#for-the-project-reviewer)
  - [Project Progress](#project-progress)
  - [Issues and Challenges](#issues-and-challenges)
  - [Project Updates](#project-updates)
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
        basic express app, routing and sequelize environment setup
        sequelize models

        rendering home, books, patrons and loans page views
            along with 'show all' for books, patrons and loans

        rendering createNewForm for new books, patrons and loans



  DOING:
        designing implementation for...
          book, patron and loans detail views

            from books page
              clicking on the book title
                send book id in url
              book detail will use param.id
                to show book's update form and loan history of that book

              can filter show all books table by overdue and checked out books

            from patrons page
              clicking on the patron name
                send patron id in url
              patron detail will use param.id
               to show patron's update form and loan history of that patron

            from loans page
              can access both book and patron detail

              can filter show all loans table by overdue and checked out books

          at end of each row in book/patron detail or filtered table     
            action column will have "return book"
              if the returned-on column has no entry

  NEXT:

        sub-views,
          create new
          book, patron and loan detail
          return book action ...
            these wont do anything until CRUD operations are implemented
            but having the views and associated routes working
              will means I can focus on the CRUD data ops

  TODO:

        would like to finish views first...
          then it will be easier to "visualize" the data and models

       could begin to implement...
        filtering of sample and display in table.pug
         but the code will change when...
          bringing in actual sequelize models and data....
           so....will start CRUD first

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

  [back to Content Menu](#contents)

## Project Updates:

  Project Updates list from most recent update to oldest

  [back to Content Menu](#contents)

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
