// importing express and setting up a router
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Sequelize = require('../models').sequelize;

/* importing sequelize db */
var db = require('../models/index.js');

/* importing locals for rendering in pub templates */
var locals = require("../views/locals");


/* GET books page. */
router.get('/', function(req, res, next) {
  db.Books.findAll().then(function(books){
    res.locals.createNewRoute = locals.booksPg.createNewRoute;
    res.locals.columnArray = locals.loansPg.columnArray;
    res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
    res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
    res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
    if (books){
            // this maps an array of the book details, which can read as rows in the book detail table
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
  res.render('bookViews/createNewBook', {book: {}, newFormTitle: 'New Book'});
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
    var idInt = parseInt(req.params.id);
    db.Loans.findOne({
      where: { id: idInt },
      include: [{
                model: db.Books,
                where: { id: Sequelize.col('Loans.book_id')}
                /* cannot assoc. Loans back to Book or Patrons back to Books
                include: [{
                          model: db.Patrons,
                          where: { id: Sequelize.col('Loans.patron_id')}
                        }] */
              }]
    }).then(function(Book){
      // breaking down the array of object in tthe patron details
      // to be read as rows in the patron update and details table
      if (Book){
        // let loansArray = Book[0].Loans.map(function(item, index){
        //   return item.dataValues;
        // });
        // let booksArray = loansArray.map(function(item, index){
        //   return item.Book.dataValues;
        // });
        // let patronObject = Patron[0].dataValues;
        //
        // res.render("patronViews/patron_detail", {booksArray: booksArray, loansRowArray: loansArray, patronObject: patronObject });
      } // TODO: what to do if patron has no loaned books ???

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

/* TODO : finish testing : POST create new book */
router.post('/books', function(req, res, next) {
  db.Books.create(req.body).then(function(book) {
    res.redirect(`/books`);
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        res.render("bookViews/createNewBook", {book: db.Books.build(req.body), errors: error.errors, title: "New Book"})
      } else {
        throw error;
      }
  }).catch(function(error){
      res.render(error);
   });
});

// exporting router so it can be used by express app
module.exports = router;
