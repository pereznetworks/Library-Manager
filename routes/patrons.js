// importing express and setting up a router
var express = require('express');
var router = express.Router();

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET patrons page. */
router.get('/patrons', function(req, res, next) {
  res.render('patrons', locals.patronsPg);
});

/* GET new patrons form page. */
router.get('/patrons/new', function(req, res, next) {
  res.render('./reusable/createNewForm', locals.patronsPg);
});

/* GET new patrons form page */
router.get('/patrons/patron_detail/id', function(req, res, next) {
  res.locals.id = req.params.id;
  res.render('./reusable/updateForm', locals.patronsPg);
});

// exporting router so it can be used by express app
module.exports = router;
