// importing express and setting up a router
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Sequelize = require('../models').sequelize;

var db = require('../models/index.js'); /* importing sequelize db */
var locals = require("../views/locals"); /* importing static vars */
var utils = require('../utils/index.js') /* importing my own helper utils */

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

      if (patronsArray.length < 9) {
        res.render("patronViews/index", {rowArray: patronsArray, title: "Patrons" });
      } else {
        let pagesArray = utils.paginate(bpatronsArray);
        res.render("patronViews/index", {pagesArray: pagesArray, title: "Patrons" });
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

      // breaking down the array of objects in the patron details
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

/* GET new patrons form page. */
router.get('/patrons/new', function(req, res, next) {

  db.Patrons.count().then(function(numOfPatrons){

    let newEmptyPatron = db.Patrons.build({first_name: '',last_name: '',address: '', email:'', zip_code:''})
    let nextLibraryId = utils.getNextLibraryID(numOfPatrons);
    newEmptyPatron.dataValues.library_id = nextLibraryId;

    res.render('patronViews/createNewPatron', {patrons: newEmptyPatron, nextLibraryId: nextLibraryId, newFormTitle: 'New Patron'});

  });
});

/* POST create new patron */
router.post('/patrons', function(req, res, next) {

  db.Patrons.create(req.body).then(function(patron){
    res.redirect(`/patrons`);

  }).catch(function(error){

      if(error.name === "SequelizeValidationError") {

          db.Patrons.count().then(function(numOfPatrons){

           let patronInfoSubmitted = db.Patrons.build(req.body)
           let nextLibraryId = utils.getNextLibraryID(numOfPatrons);
           patronInfoSubmitted.dataValues.library_id = nextLibraryId;

           res.render('patronViews/createNewPatron', {patrons: patronInfoSubmitted , errors: error.errors, title: "New Patron"})
        });

      } else {
        throw error;
      }
  }).catch(function(error){
    res.locals.message = "Oops, there's been some error";
    res.status(error.status || 500);
    res.render('error');
   });
});

/* POST update new patron */
router.post('/patrons/update', function(req, res, next) {
  db.Patrons.findOne({
      where: {id: req.body.id}
      }).then(function(patron) {
        return patron.update(req.body);
      }).then(function(){
        res.redirect(`/patrons`);
      }).catch(function(error){
         if(error.name === "SequelizeValidationError") {
           res.render('patronViews/update', {patrons: db.Patrons.build(req.body), errors: error.errors, title: "New Patron"})
         } else {
           throw error;
         }
      }).catch(function(error){
        res.locals.error = createError(500);
        res.locals.message = "Oops, there's been some error";
        res.status(500);
        res.render('error');
      });

});
// add return_book route and hanlder here ??

// exporting router so it can be used by express app
module.exports = router;
