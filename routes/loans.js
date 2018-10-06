// importing express and setting up a router
var express = require('express');
var router = express.Router();

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET loans page. */
router.get('/loans', function(req, res, next) {
  res.render('loanViews/index', locals.loansPg);
});

/* GET new loans form page. */
router.get('/loans/new', function(req, res, next) {
  // pass to createNewForm template (loans: {}, needed paramaters)
  res.render('./reusable/createNewForm', locals.loansPg);
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
