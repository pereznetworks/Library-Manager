// importing express and setting up a router
var express = require('express');
var router = express.Router();

/* importing locals for rendering in pub templates */
var locals = require("../views/locals");

/* GET books page. */
router.get('/books', function(req, res, next) {
  res.render('books', locals.booksPg);
});

/* GET new books form page */
router.get('/books/new', function(req, res, next) {
  res.render('./reusable/createNewForm', locals.booksPg);
});

/* GET new books form page */
router.get('/book/book_detail/id', function(req, res, next) {
  res.locals.id = req.params.id;
  res.render('./reusable/updateForm', locals.booksPg);
});



// exporting router so it can be used by express app
module.exports = router;
