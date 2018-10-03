// importing express and setting up a router
var express = require('express');
var router = express.Router();

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET loans page. */
router.get('/loans', function(req, res, next) {
  res.render('loans', locals.loansPg);
});

/* GET new loans form page. */
router.get('/loans/new', function(req, res, next) {
  res.render('./reusable/createNewForm', locals.loansPg);
});

/* GET return book form page */
router.get('/loans/return_book/id', function(req, res, next) {
  res.locals.id = req.params.id;
  res.render('./reusable/updateForm', locals.loansPg);
});

// exporting router so it can be used by express app
module.exports = router;
