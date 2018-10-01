# TD-Project10: Build a Library Manager

## Contents:
  - [For Project Reviewer](#for-the-project-reviewer)
  - [Project Progress](#project-progress)
  - [Issues and Challenges](#issues-and-challenges)
  - [Project Updates](#project-updates)
    - [Project Update 2](#project-update-2)
    - [Project Update 1](#project-update-1)
  - [For the original project files and a project instruction, follow this link](https://github.com/pereznetworks/TD-Project10/tree/master/project-file-library-manager-v1)

# For the Project Reviewer

  This section will eventually contain any instructions and comments...
   the project reviewer will need to
      make it easier to review and grade the project.

  [back to Content Menu](#contents)

## Project Progress

  Completed: Before You Start.

  Completed: Reviewed Sequelize workshops and database courses

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

  [back to Content Menu](#contents)

## Project Updates:

  Project Updates list from most recent update to oldest

  [back to Content Menu](#contents)

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

## Project Update 2:

  Note: need to keep in mind differences between [Sequelize v3 to v4](http://docs.sequelizejs.com/manual/tutorial/upgrade-to-v4.html)

  will need refer to my Sequelize workshop Blog example v3 and v4 for syntax and implementation differences

  making these a GitHub repo for easier reference and safe keeping

## Project Update 1:

  Before You Start:

  I did indeed downloaded the project files

[For the original project files and a readme follow this link](https://github.com/pereznetworks/TD-Project10/tree/master/project-file-library-manager-v1)

  Read, studied and created my own markdown-style version of the project instructions

  Created this markdown-style   project readme to track and document my progress through this project.

  Will eventually be a how-to for developers and other students...
  who want to clone, download and work on their version of this project.

  [back to Content Menu](#contents)
