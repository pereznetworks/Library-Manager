// importing express and setting up a router
var express = require('express');
var router = express.Router();

/* importing sequelize models */
var Books = require("../models").Books;
var Loans = require("../models").Loans;

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET loans page. */
// router.get('/loans', function(req, res, next) {
//   res.render('loanViews/index', locals.loansPg);
// });

/* GET books page. */
router.get('/loans', function(req, res, next) {
  Loans.findAll().then(function(loans){
    res.locals.createNewRoute = locals.loansPg.createNewRoute;
    res.locals.columnArray = locals.loansPg.columnArray;
    res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
    res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
    res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
    if (loans){
      let loansArray = loans.map(function(item, index){
        return item.dataValues
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

  const addLeadingZero = function(num){
    // add leading zero if num less then 10
    // from stackoverflow
    // MDN days string#padStart not supported on Edge browser yet
    return (num < 10) ? ("0" + num) : num;
  };

  //getting loaned_on date
  var d = new Date();
  var day = d.getDate();
  day = addLeadingZero(day);
  var month = d.getMonth();
  month = addLeadingZero(month);
  var year = d.getFullYear();
  res.locals.dateLoanedOn = `${year}-${month}-${day}`;

  // getting the return_by date
  var rd = new Date();
  rd.setDate(rd.getDate() + 7);
  var plus7Days = rd.getDate()
  returnDay = addLeadingZero(plus7Days);
  var month = rd.getMonth();
  returnMonth = addLeadingZero(month);
  var returnYear = rd.getFullYear();
  res.locals.dateReturnBy = `${returnYear}-${returnMonth}-${returnDay}`;

  res.render('loanViews/createNewLoan', {loan: {}, newFormTitle: 'New Loan'});
});

/* GET loans details  page */
router.get('/loans/loan_detail/:id', function(req, res, next) {
  res.locals.id = req.params.id;
  // add findById sequelize query here
  res.render('loanViews/loan_detail', locals.loansPg);
});

// add return_book route and hanlder here ??

// add POST route and handler here
  // add Loans.create async promise .then().catch() method here

// exporting router so it can be used by express app
module.exports = router;
