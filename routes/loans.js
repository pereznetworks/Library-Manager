// importing express and setting up a router
var express = require('express');
var router = express.Router();
var Sequelize = require('../models').sequelize;


var db = require('../models/index.js'); /* importing sequelize db */
var locals = require("../views/locals"); /* importing static vars */
var utils = require('../utils/index.js') /* importing my own helper utils */

/* GET books page. */
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

/* GET books, filter for overdue loans page */
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
          if (Date.now() > returnBy && item.Loan.dataValues.returned_on.length == 0){
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

/* GET books, filter for checkedout loans page */
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
          if (item.Loan.dataValues.returned_on.length == 0){
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

/* GET new loans form page. */
router.get('/loans/new', function(req, res, next) {

  Promise.all([db.Patrons.findAll(), db.Books.findAll()])
  .then(([patrons, books]) => {
      res.locals.books = books.map(function(item, index){
          return item.dataValues;
        });
      res.locals.patrons = patrons.map(function(item, index){
          return item.dataValues;
        });

      /* for loaned_on date, formatted date yyyy-mm-dd */
      res.locals.dateLoanedOn = utils.getADate();

      /* for return_by date, formatted date yyyy-mm-dd */
      const defaultDaysLoanedBookDue = 7;
      res.locals.dateReturnBy = utils.getADate(defaultDaysLoanedBookDue);

      res.render('loanViews/createNewLoan', {loan: {}, newFormTitle: 'New Loan'});
    })
  .catch((error) => {
    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    // render the error page
    res.status(error.status || 500);
    res.render('error');
  });

  });


// add return_book route and hanlder here ??

/* TODO : need to test this : POST create new loan */
router.post('/loans', function(req, res, next) {
  db.Books.create(req.body).then(function(loan) {
    res.redirect(`/loans`);
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        res.render("loanViews/createNewLoan", {loan: db.Loans.build(req.body), errors: error.errors, title: "New Loan"})
      } else {
        throw error;
      }
  }).catch(function(error){
      res.render(error);
   });
});


// exporting router so it can be used by express app
module.exports = router;
