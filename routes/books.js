// importing express and setting up a router
var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* importing sequelize models */
var Books = require("../models").Books;
var Loans = require("../models").Loans;

/* importing locals for rendering in pub templates */
var locals = require("../views/locals");


/* GET books page. */
router.get('/', function(req, res, next) {
  Books.findAll().then(function(books){
    res.locals.createNewRoute = locals.booksPg.createNewRoute;
    res.locals.columnArray = locals.loansPg.columnArray;
    res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
    res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
    res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
    if (books){
      let booksArray = books.map(function(item, index){
        return item.dataValues
      });
      res.render("bookViews/index", {rowArray: booksArray, title: "Books" } );
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

/* GET book detail page */
router.get('/books/new', function(req, res, next) {
  res.locals.columnArray = locals.booksPg.columnArray;
  res.render('./reusable/createNewForm', {book: {}, newFormTitle: 'New Book', title: 'Book'});
});

/* TODO: remove this once....
   route and handler once sequelize data is fully integrated
   GET book detail page */
router.get('/books/book_detail', function(req, res, next) {
  res.locals.columnArray = locals.booksPg.columnArray;
  res.locals.title = 'Book';
  res.locals.bookTitle = locals.booksPg.rowArray[0].bookTitle;
  res.render("bookViews/book_detail", {rowArray: locals.booksPg.rowArray[0]});
});

/* GET book detail page */
router.get('/books/book_detail/:id', function(req, res, next) {
  Loans.findOne({ where: { book_id:req.params.id } }).then(function(loan){
    // TODO: this synatax and object model works
    // but data must be inserted into db tables (sequelize db:seed)
    // for any data to be displayed
    res.locals.columnArray = locals.loansPg.columnArray;
    res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
    res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
    res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
    if(!loan) {
      res.locals.error = createError(200);
      res.status(200);
      res.render("error", {message: 'No loan exists for that book'});
    } else {
      res.locals.title = 'Book';
      res.render("bookViews/book_detail", {rowArray: loan.dataValues, bookTitle: `insert book title here`});
    }
  }).catch(function(error){
    // set locals, only providing error in development
    if (error){
     res.locals.message = error.message;
     res.locals.error =  error
   } else {
     res.locals.message = "Oops, there's been a server error";
     res.locals.error = createError(500);
   }

    // render the error page
    res.status(error.status || 500);
    res.render('error');
   });
});

/* TODO : fix tbis route and handler : POST create new book */
router.post('/books', function(req, res, next) {
  Books.create(req.body).then(function(book) {
    res.redirect(`/books`);
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        res.render("bookViews/new", {book: Books.build(req.body), errors: error.errors, title: "New Book"})
      } else {
        throw error;
      }
  }).catch(function(error){
      res.render(error);
   });
;});

// exporting router so it can be used by express app
module.exports = router;
