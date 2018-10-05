// importing express and setting up a router
var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* importing sequelize models */
var Books = require("../models").Books;

/* importing locals for rendering in pub templates */
var locals = require("../views/locals");

// /* GET books page. */
// router.get('/books', function(req, res, next) {
//   res.render('books', locals.booksPg);
// });

/* GET books page. */
router.get('/', function(req, res, next) {
  Books.findAll().then(function(books){
    res.locals.createNewRoute = locals.booksPg.createNewRoute
    res.locals.columnArray = locals.loansPg.columnArray;
    res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
    res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
    res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
    res.render("books", {rowArray: books, title: "Books" } );
  }).catch(function(error){
    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    // render the error page
    res.status(error.status || 500);
    res.render('error');
   });
});

/* GET new books form page */
router.get('/books/new', function(req, res, next) {
  res.locals.columnArray = locals.booksPg.columnArray;
  res.render('./reusable/createNewForm', {book: {}, newFormTitle: 'New Book', title: 'Book'});
});

/* GET new books form page */
router.get('/books/book_detail/:id', function(req, res, next) {
  Books.findById(req.params.id).then(function(books){
    if(books) {
      res.locals.columnArray = locals.loansPg.columnArray;
      res.locals.title = "Book";
      res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
      res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
      res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
      res.render("book_detail", {rowArray: books, bookTitle: books.title});
    } else {
      res.render(error);
    }
  }).catch(function(error){
      next(error);
   });
});

/* POST create article. */
router.post('/books', function(req, res, next) {
  Books.create(req.body).then(function(book) {
    res.redirect(`/books`);
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        res.render("articles/new", {book: Books.build(req.body), errors: error.errors, title: "New Book"})
      } else {
        throw error;
      }
  }).catch(function(error){
      res.render(error);
   });
;});

// exporting router so it can be used by express app
module.exports = router;
