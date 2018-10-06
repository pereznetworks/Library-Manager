// importing express and setting up a router
var express = require('express');
var router = express.Router();

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET patrons page. */
router.get('/patrons', function(req, res, next) {
  res.render('patronViews/index', locals.patronsPg);
});

/* GET new patrons form page. */
router.get('/patrons/new', function(req, res, next) {
  res.render('./reusable/createNewForm', locals.patronsPg);
});

/* GET new patrons form page */
router.get('/patrons/patron_detail/:id', function(req, res, next) {
  res.locals.id = req.params.id;
  res.locals.columnArray = locals.loansPg.columnArray;
  res.locals.rowArray = locals.loansPg.rowArray[req.params.id];
  res.locals.title = "Patron";
  res.locals.patronName = locals.loansPg.rowArray[req.params.id].patron;
  res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
  res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
  res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
  res.render('patronViews/patron_detail');
});

// add return_book route and hanlder here ??

// exporting router so it can be used by express app
module.exports = router;
