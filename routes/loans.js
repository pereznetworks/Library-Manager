// importing express and setting up a router
var express = require('express');
var router = express.Router();
var Sequelize = require('../models').sequelize;

var db = require('../models/index.js'); /* importing sequelize db */
var locals = require("../views/locals"); /* importing static vars */
var utils = require('../utils/index.js') /* importing my own helper utils */

/* GET loans page. */
router.get('/loans', function(req, res, next) {

  var idInt = parseInt(req.params.id);

  db.Books.findAll({
      include: [{
              model: db.Loans,
              include: [{
                      model: db.Patrons,
              }]
       }]
   }).then(function(books){

    res.locals.createNewRoute = locals.loansPg.createNewRoute;
    res.locals.queryForAll = locals.loansPg.queryForAll;
    res.locals.queryForOverdue = locals.loansPg.queryForOverdue;
    res.locals.queryForCheckedOut = locals.loansPg.queryForCheckedOut;
    res.locals.columnArray = locals.loansPg.columnArray;
    res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
    res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
    res.locals.actionHrefPath = locals.loansPg.actionHrefPath;

    if (books){
      let loansArray = books.filter(function(item, index){
        if (item.Loan !== null ){
          return item
        }
      });
      res.render("loanViews/index", {rowArray: loansArray, title: "Loans" } );
    }

  }).catch(function(error){

    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    // render the error page
    res.status(error.status || 500);
    res.render('error');

   });
});

/* GET loans, filter for overdue loans page */
router.get('/loans/overdue', function(req, res, next){

  var idInt = parseInt(req.params.id);

  db.Books.findAll({
      include: [{
              model: db.Loans,
              include: [{
                      model: db.Patrons,
              }]
       }]
   }).then(function(books){

    res.locals.createNewRoute = locals.loansPg.createNewRoute;
    res.locals.queryForAll = locals.loansPg.queryForAll;
    res.locals.queryForOverdue = locals.loansPg.queryForOverdue;
    res.locals.queryForCheckedOut = locals.loansPg.queryForCheckedOut;
    res.locals.columnArray = locals.loansPg.columnArray;
    res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
    res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
    res.locals.actionHrefPath = locals.loansPg.actionHrefPath;

    if (books){
      // this maps an array of the loan details, which can read as rows in the loans detail table
      // in this case - an array of OVERDUE loans
      // yes - I am searching the books table and including the loans and patron table
      // this is because of the way the table associations work
      let loansArray = books.filter(function(item, index){
        if (item.Loan !== null ){
          let returnBy = new Date(item.Loan.dataValues.return_by)
          if (Date.now() > returnBy && item.Loan.dataValues.returned_on == null ){
            return item.dataValues
          }
        }
      });
      res.render("loanViews/index", {rowArray: loansArray, title: "Loans" } );
    }

  }).catch(function(error){

    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    // render the error page
    res.status(error.status || 500);
    res.render('error');

   });

});

/* GET loans, filter for checkedout loans page */
router.get('/loans/checkedout', function(req, res, next){

  var idInt = parseInt(req.params.id);

  db.Books.findAll({
      include: [{
              model: db.Loans,
              include: [{
                      model: db.Patrons,
              }]
       }]
   }).then(function(books){

    res.locals.createNewRoute = locals.loansPg.createNewRoute;
    res.locals.queryForAll = locals.loansPg.queryForAll;
    res.locals.queryForOverdue = locals.loansPg.queryForOverdue;
    res.locals.queryForCheckedOut = locals.loansPg.queryForCheckedOut;
    res.locals.columnArray = locals.loansPg.columnArray;
    res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
    res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
    res.locals.actionHrefPath = locals.loansPg.actionHrefPath;

    if (books){
      // this maps an array of the loan details, which can read as rows in the loans detail table
      // in this case - an array of CHECKED OUT loans
      // yes - I am searching the books table and including the loans and patron table
      // this is because of the way the table associations work
      let loansArray = books.filter(function(item, index){
        if (item.Loan !== null ){
          if ( item.Loan.returned_on == null ){
            return item.dataValues
          }
        }
      });
      res.render("loanViews/index", {rowArray: loansArray, title: "Loans" } );
    }

  }).catch(function(error){

    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    // render the error page
    res.status(error.status || 500);
    res.render('error');

   });

});


/* GET new loans form page
 * okay, so this is a bit more involved than than the new Patron and New Loan forms
*/
router.get('/loans/new', function(req, res, next) {
// handling multiple async calls, chaining callbacks with then and catch
  Promise.all([
     db.Patrons.findAll(),
     db.Books.findAll({
       include: [{
               model: db.Loans,
               required: false
        }]
     })
   ])
  .then(([patrons, books]) => {

      // first for the book and patron's drop down meny....
      // produce a new lists of available books and current patrons
      // since we're doing this each time this form is produced
      // books no longer available for loan will not show up on this list

      res.locals.books = books.filter(function(item, index){
        // filtering out books that are already loaned out
          if (item.Loan == null || item.Loan.dataValues.returned_on !== null ){
            // return just each book's title, author, genre and first_published
              return item.dataValues;
          }
        });  // produces an array of book objects, that are available to be loaned

      res.locals.patrons = patrons.map(function(item, index){
        // produces array of patron objects...
          return item.dataValues;
        }); // each with name, contact info and library id

      /* for loaned_on date, formatted date yyyy-mm-dd */
      res.locals.dateLoanedOn = utils.getADate();

      /* for return_by date, formatted date yyyy-mm-dd */
      const defaultDaysLoanedBookDue = 7;
      res.locals.dateReturnBy = utils.getADate(defaultDaysLoanedBookDue);

      // finally... with all this data, render the create new form
      res.render('loanViews/createNewLoan', {loan: {}, newFormTitle: 'New Loan'});
    })
  .catch((error) => {
    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    // render the error page
    res.status(error.status || 500);
    res.render('error');
  }); // end Promise.all

}); // end router.get /loans/new

/* POST create new loan */
router.post('/loans', function(req, res, next) {
  // take the data in req.body from the form and create a new row in the loans table
  db.Loans.create(req.body).then(function(loan) {
    // then render main loans table
    res.redirect(`/loans`);
  }).catch(function(error){
     // if validation fails, render the form again, with the input and validation msgs
      if(error.name === "SequelizeValidationError") {
        Promise.all([
           db.Patrons.findAll(),
           db.Books.findAll({
             include: [{
                     model: db.Loans,
                     required: false
              }]
           })
         ])
        .then(([patrons, books]) => {

            // first for the book and patron's drop down meny....
            // produce a new lists of available books and current patrons
            // since we're doing this each time this form is produced
            // books no longer available for loan will not show up on this list

            res.locals.books = books.filter(function(item, index){
              // filtering out books that are already loaned out
                if (item.Loan == null || item.Loan.dataValues.returned_on != null ){
                  // return just each book's title, author, genre and first_published
                    return item.dataValues;
                }
              });  // produces an array of book objects, that are available to be loaned

            res.locals.patrons = patrons.map(function(item, index){
              // produces array of patron objects...
                return item.dataValues;
              }); // each with name, contact info and library id

            /* for loaned_on date, formatted date yyyy-mm-dd */
            res.locals.dateLoanedOn = utils.getADate();

            /* for return_by date, formatted date yyyy-mm-dd */
            const defaultDaysLoanedBookDue = 7;
            res.locals.dateReturnBy = utils.getADate(defaultDaysLoanedBookDue);

            // finally... with all this data, render the create new form
            res.render('loanViews/createNewLoan', {loan: db.Loans.build(req.body), errors: error.errors, newFormTitle: "New Loan"});
          })
          .catch((error) => {
              // set locals, only providing error in development
            res.locals.message = error.message;
            res.locals.error = req.app.get('env') === 'development' ? error : {};

            // render the error page
            res.status(error.status || 500);
            res.render('error');
        }); // end Promise.all

      } else {
        // if not a validation error...
        throw error;
      }
  }).catch(function(error){
      res.render(error);
   });
});


// exporting router so it can be used by express app
module.exports = router;
