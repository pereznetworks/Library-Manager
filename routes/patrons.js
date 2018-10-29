// importing express and setting up a router
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Sequelize = require('../models').sequelize;
var Op = Sequelize.Op;

var db = require('../models/index.js'); /* importing sequelize db */
var locals = require("../views/locals"); /* importing static vars */
var utils = require('../utils/index.js') /* importing my own helper utils */

/* GET patrons page. */
router.get('/patrons', function(req, res, next) {
  db.Patrons.findAll().then(function(patrons){

    // static paths and variables
    res.locals.newFormTitle = locals.patronsPg.newFormTitle;
    res.locals.title = locals.patronsPg.title;
    res.locals.createNewRoute = locals.patronsPg.createNewRoute;
    res.locals.patronHrefPath = locals.patronsPg.patronHrefPath;

    if (patrons){

      // simplifying the array, to make it easier to iterate in pug template
      let patronsArray = patrons.map(function(item, index){
        return item.dataValues
      });

      if (patronsArray.length < 11) {
        // to paginate or not to paginate
        res.render("patronViews/index", {rowArray: patronsArray, title: "Patrons" });
      } else {
        let pagesArray = utils.paginate(patronsArray);
        res.render("patronViews/index", {pagesArray: pagesArray, title: "Patrons" });
        // actual pagination done implemented by...
        // bookViews, loanViews and patronViews index.pug templates
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
  // the id is actually an integer, so parsing if from req.params
  var idInt = parseInt(req.params.id);

  // static paths and variables
  res.locals.title = 'Patron';
  res.locals.columnArray = locals.patronsPg.columnArray;
  res.locals.loansColumnArray = locals.loansPg.columnArray;
  res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
  res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
  res.locals.actionHrefPath = locals.loansPg.actionHrefPath;

  // find the patron by the id
  // and associated loans
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

      if (Patron.Loans){

        // simplifying the patrons array of arrays of objects
        // to make it easier to iterate in pug template

        let loansArray = Patron.Loans.map(function(item, index){
          return item.dataValues;
        });

        let booksArray = loansArray.map(function(item, index){
          return item.Book.dataValues;
        });

        res.render("patronViews/patron_detail", {booksArray: booksArray, loansArray: loansArray, patronObject: patronObject });

      } else {  // in case patron has no loan history yet

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
    // build an empty patron object
    let newEmptyPatron = db.Patrons.build({first_name: '',last_name: '',address: '', email:'', zip_code:''})

    // the next library id is always the num of patrons minus 1
    // plus... MCL + 100 and a leading zero
    let nextLibraryId = utils.getNextLibraryID(numOfPatrons);

    // autopopulate the library_id field
    newEmptyPatron.dataValues.library_id = nextLibraryId;

    // render form with this newEmptyPatron template
    res.render('patronViews/createNewPatron', {patrons: newEmptyPatron, nextLibraryId: nextLibraryId, newFormTitle: 'New Patron'});

  });
});

/* POST create new patron */
router.post('/patrons', function(req, res, next) {
  // create and add the patron with the data submitted from the form
  db.Patrons.create(req.body).then(function(patron){
    res.redirect(`/patrons`);

  }).catch(function(error){

      if(error.name === "SequelizeValidationError") {
          // if validaton errors...
          // redo the form rendering
          // with error msg for each invalid input
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
  // update the patron record with the data submitted from the form
  db.Patrons.findOne({
      where: {id: req.body.id}
      }).then(function(patron) {
        return patron.update(req.body);
      }).then(function(){
        res.redirect(`/patrons`);
      }).catch(function(error){
         if(error.name === "SequelizeValidationError") {

           // query patrons table and re-render patrons all over again
           // with validation errors..

           db.Patrons.findOne({
               where: { id:req.body.id},
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

               // static paths and variables
               res.locals.title = 'Patron';
               res.locals.columnArray = locals.patronsPg.columnArray;
               res.locals.loansColumnArray = locals.loansPg.columnArray;
               res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
               res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
               res.locals.actionHrefPath = locals.loansPg.actionHrefPath;

               // breaking down the array of objects in the patron details
               // to be read as rows in the patron update and details table
               let patronObject = Patron.dataValues;

               if (Patron.Loans){

                 // simplifying the patrons array of arrays of objects
                 // to make it easier to iterate in pug template

                 let loansArray = Patron.Loans.map(function(item, index){
                   return item.dataValues;
                 });

                 let booksArray = loansArray.map(function(item, index){
                   return item.Book.dataValues;
                 });

                 res.render("patronViews/patron_detail", {booksArray: booksArray, loansArray: loansArray, patronObject: patronObject, submitData: db.Patrons.build(req.body), errors: error.errors, title: "Patron" });

               } else {  // in case patron has no loan history yet

                 res.render("patronViews/patron_detail", {patronObject: patronObject, submitData: db.Patrons.build(req.body), errors: error.errors, title: "Patron" });

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

         } else {
           throw error;
         }
      }).catch(function(error){
        // if there is some other error
        res.locals.error = createError(500);
        res.locals.message = "Oops, there's been some error";
        res.status(500);
        res.render('error');
      });

});

/* Search patrons route */
router.get('/patrons/search', function(req, res, next) {

  // getting searchInput from req.query
  var searchInput = req.query.searchInput;

  // static variables, routes paths, page and form titles
  res.locals.newFormTitle = locals.patronsPg.newFormTitle;
  res.locals.title = locals.patronsPg.title;
  res.locals.createNewRoute = locals.patronsPg.createNewRoute;
  res.locals.patronHrefPath = locals.patronsPg.patronHrefPath;

  // search on fields displayed in patron table
  db.Patrons.findAll({
          where: {
            [Op.or]:[
                  {
                    first_name: { [Op.like]: `%${searchInput}%`}
                  },
                  {
                    last_name: { [Op.like]: `%${searchInput}%`}
                  },
                  {
                    address: { [Op.like]: `%${searchInput}%`}
                  },
                  {
                    zip_code: { [Op.like]: `%${searchInput}%`}
                  },
                  {
                    email: { [Op.like]: `%${searchInput}%`}
                  },
                  {
                    library_id: { [Op.like]: `%${searchInput}%`}
                  }
            ]
         }
    }).then(function(patrons){

      if (patrons){
        // mapping patrons into an array that be read as rows in patron table
        let patronsArray = patrons.map(function(item, index){
          return item.dataValues
        });

        // paginate if more than 10 results
        if (patronsArray.length < 11) {
          res.render("patronViews/index", {rowArray: patronsArray, title: "Patrons", search: " - Search results:"});
        } else {
          let pagesArray = utils.paginate(patronsArray);
          res.render("patronViews/index", {pagesArray: pagesArray, title: "Patrons", search: " - Search results:" });
        }

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



// exporting router so it can be used by express app
module.exports = router;
