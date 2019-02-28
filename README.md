# TD-Project10: Build a Library Manager

## Contents:
  - [Project Status](#project-status)
  - [For Project Reviewer](#for-the-project-reviewer)
  - [For Developers](#for-developers)
  - [Project Updates](#project-updates)
  - [Initial Project Development](./dev-project.md)

## Project Status

- Initial Development complete:

  - This will continue to be a 'class' project
    - as part of my Full Stack JavaScript Tech Degree through Team Treehouse

  - I may begin development on more feature for this project...
    - At that point this current master branch will become v.0.0.1
    - I will start a new master branch, which will become v.0.0.2
    - no ETA on this...

- Potential New Features:

  - Remove Book, Remove Patron
    - in a way that fits with the 'Library Manager' scenario...
      - a remove Book and a remove Patron feature
      - an internal delete function
        - for removing a record from specific table

  - DRY and Modular methods
    - sure is a lot of repeated code....
      - due to context-based info
      - is hard to re-factor to DRY
        - but would like to try it

  - Advanced Sequelize db functions
    - explore using model instances
      - for SET and SAVE instead of a bulk update
    - also a VIEW and EXPORT into json or csv of data

  - Fully modern mobile first UI
      - modern menu's and icons in place of just button and links
      - upgrade to UI rendering to react

  [back to Content Menu](#contents)

## For Developers

  - Basics steps:

  - 1: to run this version of Team TreeHouse, Library Manager...

    - download or clone of project from my Github rep
    - npm install
    - npm start
    - open localhost:3000 in an internet browser

  - 2: when testing, recommend using Chrome browser

    - npm start is set to run the app with the --inspect flag
      - "node --inspect ./bin/www"
      - can use with node.js chrome browser developer tools

  - 3: then make your own changes to the code
      - then when ready run 'npm start'
      - but, read the following first

  - 4: the following folders and files comprise the Library Manager app

    - I ended up not using migrations in my project
      - but the sequelize config is setup to track migrations and seeders
    - I did use seeders to insert sample data into my library db
      - / (root)
        - /bin
        - /config
        - /migrations
        - /models
        - /public
        - /routes
        - /seeders
        - /views
        - /utils
        - seedData.json
        - app.js
        - library.db - can't be modified or viewed directly
        - package.json - npm package management

  - 5: more info...
  - [The original project files and a project instructions](https://github.com/pereznetworks/TD-Project10/tree/master/z-project-files-library-manager-v1)
  - [Developer Notes](#developer-notes)
  - [Hard DB Reset](#hard-db-reset)

[back to Content Menu](#contents)

## Developer Notes:

- 1: Lots of pages and subpages in the [html-mockup](z-project-files-library-manager-v1/html-mockup/):

  - lots of components and sub-components
  - Will need to make sure I don't make the routing over-complicated
  - UI and UI-controls will need change based on context of data presented

- 2: This is an Express.js app:

  - Sequelize/SQLite for data,
  - Pug for html rendering,
  - with Express for routing http get/put req/res
  - and a whole bunch of npm modules... see package.json

- 3: Sequelize v4 is different from the v3 demo'ed in the Sequelize/Node.js workshop:

  - I completed the Sequelize/Node.js workshop using both v3 and v4
  - I will use these as model to make sure Sequelize v4 syntax and methods used in this app

- 4: Date Formatting:

  - use DATATYPES. or Sequelize.DATEONLY for yyyy-mm-dd dates ie... 2018-10-11

- 5: Not Using sample library.db that came with project files,
  - seems to work only with seqeulize v3:
  - Solution is simple: Express app runs sequelize bootstrapped code
  - which uses config file and creates a new libary.db in none exists
  - along with seeders... can then refresh library.db when I need to
  - see [HARD DB RESET](#hard-db-reset) below

- 6: For whatever reason, after adding ANY-KIND of model associations...

  - I could NOT get the seeders past this one error:
    - ERROR: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed
    - to get around this I did a [HARD DB RESET](#hard-db-reset)

- 7: Seqeulize auto-incremented id's

  - So javascript array count element up from 0.
  - but sequelize's auto-incremented id's start from 1

  - so in an array derived from a sequelize table
    - you have to +1 to the array's element number to get it's auto-incremented_id

## HARD DB RESET:

- PREFACE:
- BACK-UP your data and server  
  - and hopefully already have a BACK-UP of your data and server
- WHAT THIS WILL NOT DO...
  - if your in production, STOP HERE and..
    - read up on underlying db-engine, like SQLite, for working with production data
  - this process WILL NOT FIX CORRUPTED DATA AND/OR CORRUPTED DBs
- WHAT THIS MAY DO
  - If your app is in the development stages...
  - can use this to work through fundamental problems and bugs in your sequelize code
  - nice to try, for example ...
    - if odd behavior occurs if/when making changes to your model associations
  - also because the db file may be gitignore'ed
    - so a revert does not fix the library db file after bad things happened
    - probably not a good idea to rely on git to fix your library db file anyway

- short-version,

  - 1: rm -rf library.db (after making a backup)

  - 2: remove model associations from code

  - 3: restart app, which creates a blank library.db, stop the app

  - 4: empty seeders.json, run seeders,

  - 5: after seed data is inserted....stop the app

  - 6: add associations back in to code

  - 7: restart app and test if model associations work....

- long-version

  - 1: delete library.db, (after making a backup)
    - in my this repo, model/index.js creates it if there is none

  - 2: remove model associations
    - in my app, all in one place, models/index.js

  - 3: remove seeders history from seedData.json,
    - edit the json file, leaving just the outermost array brackets, []

  - 4: RUN sequelize seed:generate -name <name of model>
    - FOR EACH MODEL/TABLE your db will need
    - this will create a js file that can be run to add data that fits that model
    - to may seem incomplete, doesn't yet have your code

  - 5: add your code and data for each model/table
    - to each separate seed file for each model that you just generated
    - defaults to /seeders folder

  - 6: restart the server app
    - code in the repo, it's npm start
    - also, code in this repo, model/index.js, this create a new blank db if there is none

  - 7: stop the server

  - 8: run the seeders
    - sequelize db:seed:all
      - this updates your models from and adds the sample data you saved to the seeder files
    - if your using git, do a commit now, so you always revert back to this point

  - 9: add the desired model associations back into your code
    - in this repo, all in one place, models/index.js

  - 10: restart the server app
    - which now has all the models, associations and sample data  

  - 11: when your db starts up, it will check the model associations...

  - 12: if errors DO occur, back to drawing board
    - using git revert back to step 8
      - re-work your associations

  - 13: if NO errors, your app is now running,
    - with associations that don't crash your app...
    - still not out of the woods yet...

  - 14: now to test the associations
    - access a web-page form/table...
    - that runs code that runs a query that uses the model and associations
    - see if the associations work as expected with seed data in the tables

[back to Content Menu](#contents)
