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
router.get('/books/book_detail/:id', function(req, res, next) {
  res.locals.id = req.params.id;
  res.locals.columnArray = locals.loansPg.columnArray;
  res.locals.rowArray = locals.loansPg.rowArray[req.params.id];
  res.locals.title = "Book";
  res.locals.bookTitle = locals.loansPg.rowArray[req.params.id].book;
  res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
  res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
  res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
  res.render('book_detail');
});



// exporting router so it can be used by express app
module.exports = router;
