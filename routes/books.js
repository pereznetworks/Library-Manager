// importing express and setting up a router
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Sequelize = require('../models').sequelize;
var Op = Sequelize.Op;

var db = require('../models/index.js'); /* importing sequelize db */
var locals = require("../views/locals"); /* importing static vars */
var utils = require('../utils/index.js') /* importing my own helper utils */

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
      if (booksArray.length < 9) {
        res.render("bookViews/index", {rowArray: booksArray, title: "Books" } );
      } else {
        let pagesArray = utils.paginate(booksArray);
        res.render("bookViews/index", {pagesArray: pagesArray, title: "Books" } );
      }
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
                required: true,
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
      let booksArray = books.filter(function(item, index){
        let returnBy = new Date(item.Loan.dataValues.return_by)
          if (Date.now() > returnBy && item.Loan.dataValues.returned_on == null ){
            return item.dataValues
          }
      });
      if (booksArray.length < 9) {
        res.render("bookViews/index", {rowArray: booksArray, title: "Books", filterTitle: 'Overdue Loans' } );
      } else {
        let pagesArray = utils.paginate(booksArray);
        res.render("bookViews/index", {pagesArray: pagesArray, title: "Books", filterTitle: 'Overdue Loans' } );
      }
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
                required: true,
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
      let booksArray = books.filter(function(item, index){
        if ( item.Loan.dataValues.returned_on == null)
        return item.dataValues
      });

      if (booksArray.length < 9) {
        res.render("bookViews/index", {rowArray: booksArray, title: "Books", filterTitle: 'Checked Out Books' } );
      } else {
        let pagesArray = utils.paginate(booksArray);
        res.render("bookViews/index", {pagesArray: pagesArray, title: "Books", filterTitle: 'Checked Out Books' } );
      }

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
router.get('/books/book_detail/:id', function(req, res, next) {
  // parsing to int because the id field in the table is an INTEGER
    var idInt = parseInt(req.params.id);
    // required: false on the include for Loan and Patron
    // in case a book has no loan history
    db.Books.findOne({
      where: { id: idInt },
      include: [{
        model: db.Loans,
        where: { book_id: Sequelize.col('Books.id')},
        required: false,
              include: [{
                  model: db.Patrons,
                  required: false
              }]
      }]
    }).then(function(book){

      // passing some static variables to be rendered
      res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
      res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
      res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
      res.locals.title = 'Book';
      res.locals.bookTitle = book.dataValues.title;

      // breaking down the array of objects in the Book array ...
      // into objects that can be more easily read as rows ...
      // in the book's update and book's loan details table
      // TODO: if the returned data is uniform enough - refactor this into modular function

      if (book.Loan){

        // rendering the book detial page with book, loan and patron detail
        res.render("bookViews/book_detail", {book: book.dataValues, loan: book.Loan.dataValues, patron: book.Loan.Patron.dataValues});

      } else {  // if book has no loan history ...

        // rendering the book detial page with book detail only
        res.render("bookViews/book_detail", {book: book.dataValues});
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

/* GET new book form */
router.get('/books/new', function(req, res, next) {
  res.render('bookViews/createNewBook', {book: {}, newFormTitle: 'New Book'});
});

/* POST create new book */
router.post('/books', function(req, res, next) {
  db.Books.create(req.body).then(function(book) {
    res.redirect(`/books`);
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {

        // input validation msgs will be at different indexes based on which fields had invalid input

        res.render("bookViews/createNewBook", {book: db.Books.build(req.body), errors: error.errors, newFormTitle: "New Book"})

      } else {
        throw error;
      }
  }).catch(function(error){
      res.render('error');
   });
});

/* POST update new patron */
router.post('/books/update', function(req, res, next) {

  db.Books.findOne({
      where: {id: req.body.id}
    }).then(function(book) {
        return book.update(req.body);
      }).then(function(){
        res.redirect(`/books`);
      }).catch(function(error){
         if(error.name === "SequelizeValidationError") {
           res.render('bookViews/createNewBook', {patrons: db.Books.build(req.body), errors: error.errors, title: "New Book"})
         } else {
           throw error;
         }
      }).catch(function(error){
         res.render('error');
      });
  /*
  res.locals.message = "Oops, this page is under construction";
  res.locals.error = createError(500);
  res.status(error.status || 500);
  res.render('error');
  */
});

/* search route for Books page. */
router.get('/books/search/', function(req, res, next) {
  db.Books.findAll({
            where: {
                  [Op.or]: [
                      {
                        author: {[Op.like]: `%${req.query.searchInput}%`}
                      },
                      {
                        genre: {[Op.like]: `%${req.query.searchInput}%`}
                      },
                      {
                        title: {[Op.like]: `%${req.query.searchInput}%`}
                      },
                      {
                        first_published: {[Op.like]: `%${req.query.searchInput}%`}
                      }
                   ]
               }
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
      let booksArray = books.map(function(item, index){
        return item.dataValues
      });
      if (booksArray.length < 9) {
        res.render("bookViews/index", {rowArray: booksArray, title: "Books", search: " - Search results:" } );
      } else {
        let pagesArray = utils.paginate(booksArray);
        res.render("bookViews/index", {pagesArray: pagesArray, title: "Books", search: " - Search results:" } );
      }
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

// exporting router so it can be used by express app
module.exports = router;
