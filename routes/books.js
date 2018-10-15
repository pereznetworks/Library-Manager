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
router.get('/books', function(req, res, next) {
  db.Books.findAll().then(function(books){

    res.locals.queryForAll = locals.booksPg.queryForAll;
    res.locals.queryForOverdue = locals.booksPg.queryForOverdue;
    res.locals.queryForCheckedOut = locals.booksPg.queryForCheckedOut;
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

/* GET books, filter for overdue books page */
router.get('/books/overdue', function(req, res, next){
  db.Books.findAll({
      include: [{
                model: db.Loans,
                where: { book_id: Sequelize.col('Books.id')},
                include: [{
                          model: db.Patrons,
                        }]
              }]
    }).then(function(books){

    res.locals.queryForAll = locals.booksPg.queryForAll;
    res.locals.queryForOverdue = locals.booksPg.queryForOverdue;
    res.locals.queryForCheckedOut = locals.booksPg.queryForCheckedOut;
    res.locals.createNewRoute = locals.booksPg.createNewRoute;
    res.locals.columnArray = locals.loansPg.columnArray;
    res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
    res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
    res.locals.actionHrefPath = locals.loansPg.actionHrefPath;

    if (books){
    // this maps an array of the book details, which can read as rows in the book detail table
    // in this case - an array of OVERDUE books
      let booksArray = books.map(function(item, index){
        let loanedOn = new Date(item.Loan.dataValues.loaned_on)
        if (Date.now() > loanedOn && item.Loan.dataValues.returned_on == 0){
          return item.dataValues
        }
      });
      res.render("bookViews/index", {rowArray: booksArray, title: "Books", filterTitle: 'Overdue Books'} );
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

/* GET books, filter for checkedout books page */
router.get('/books/checkedout', function(req, res, next){
  db.Books.findAll({
      include: [{
                model: db.Loans,
                where: { book_id: Sequelize.col('Books.id')},
                include: [{
                          model: db.Patrons,
                        }]
              }]
    }).then(function(books){

    res.locals.queryForAll = locals.booksPg.queryForAll;
    res.locals.queryForOverdue = locals.booksPg.queryForOverdue;
    res.locals.queryForCheckedOut = locals.booksPg.queryForCheckedOut;
    res.locals.createNewRoute = locals.booksPg.createNewRoute;
    res.locals.columnArray = locals.loansPg.columnArray;
    res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
    res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
    res.locals.actionHrefPath = locals.loansPg.actionHrefPath;

    if (books){
      // this maps an array of the book details, which can read as rows in the book detail table
      // in this case an array CHECKED OUT Books
      let booksArray = books.map(function(item, index){
        if (item.Loan.dataValues.loaned_on.length !== 0 && item.Loan.dataValues.returned_on == 0)
        return item.dataValues
      });
      res.render("bookViews/index", {rowArray: booksArray, title: "Books", filterTitle: 'Checked Out Books'} );
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

/* GET book detail page */
// TODO: handle case where book is not loaned out, so no loan detail
router.get('/books/book_detail/:id', function(req, res, next) {
    var idInt = parseInt(req.params.id);
    Books.findOne({
        where: {
              [Op.or]: [
                  {Books.id: idInt},
                  {Loans.book_id: idInt}
                 ]
               },
        include: [{
            model: Loans,
            required: false
           }]})
    }).then(function(book){
      // breaking down the array of objects in the Book and Loans array
      // into objects that can be read as rows
      //  in the book's update and book's loan details table
      // TODO: if the returned data is uniform enough - refactor this into modular function

      if (book){
        res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
        res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
        res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
        res.locals.title = 'Book';
        res.locals.bookTitle = book.dataValues.title;
        // rendering the book detial page with above values
        res.render("bookViews/book_detail", {book: book.dataValues, loan: book.Loan.dataValues, patron: book.Loan.Patron.dataValues});
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
