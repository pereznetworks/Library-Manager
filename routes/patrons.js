// importing express and setting up a router
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Sequelize = require('../models').sequelize;

/* importing sequelize db */
var db = require('../models/index.js');

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET patrons page. */
// router.get('/patrons', function(req, res, next) {
//   res.render('patronViews/index', locals.patronsPg);
// });

/* GET patrons page. */
router.get('/patrons', function(req, res, next) {
  db.Patrons.findAll().then(function(patrons){
    res.locals.newFormTitle = locals.patronsPg.newFormTitle;
    res.locals.title = locals.patronsPg.title;
    res.locals.createNewRoute = locals.patronsPg.createNewRoute;
    res.locals.patronHrefPath = locals.patronsPg.patronHrefPath;
    if (patrons){
      let patronsArray = patrons.map(function(item, index){
        return item.dataValues
      });
      res.render("patronViews/index", {rowArray: patronsArray, title: "Patrons" } );
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

/* GET new patrons form page. */
router.get('/patrons/new', function(req, res, next) {
  res.render('patronViews/createNewPatron', {patron: {}, newFormTitle: 'New Patron'});
});

/* GET new patrons form page */
router.get('/patrons/patron_detail/:id', function(req, res, next) {

  var idInt = parseInt(req.params.id);

  res.locals.title = 'Patron';
  res.locals.columnArray = locals.patronsPg.columnArray;
  res.locals.loansColumnArray = locals.loansPg.columnArray;
  res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
  res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
  res.locals.actionHrefPath = locals.loansPg.actionHrefPath;

  db.Patrons.findOne({
      where: { id: idInt },
      include: [{
              model: db.Loans,
              where: { patron_id: Sequelize.col('Patrons.id') },
              required: false,
              include: [{
                      model: db.Books,
                      where: { id: Sequelize.col('Loans.book_id')},
                      required: false
              }]
       }]
    }).then(function(Patron){

      // breaking down the array of object in the patron details
      // to be read as rows in the patron update and details table
      let patronObject = Patron.dataValues;

      if (Patron.Loans){  // in case patron has no loan history yet

        let loansArray = Patron.Loans.map(function(item, index){
          return item.dataValues;
        });

        let booksArray = loansArray.map(function(item, index){
          return item.Book.dataValues;
        });

        res.render("patronViews/patron_detail", {booksArray: booksArray, loansArray: loansArray, patronObject: patronObject });

      } else {

        res.render("patronViews/patron_detail", {patronObject: patronObject });

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

/* TODO : finish testing : POST create new patron */
router.post('/patrons', function(req, res, next) {
  db.Patrons.create(req.body).then(function(patron) {
    res.redirect(`/patrons`);
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        res.render('patronViews/createNewPatron', {patrons: db.Patrons.build(req.body), errors: error.errors, title: "New Patron"})
      } else {
        throw error;
      }
  }).catch(function(error){
      res.render(error);
   });
});

// add return_book route and hanlder here ??

// exporting router so it can be used by express app
module.exports = router;
