// importing express and setting up a router
var express = require('express');
var router = express.Router();

/* importing sequelize models */
var Patrons = require("../models").Patrons;

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET patrons page. */
// router.get('/patrons', function(req, res, next) {
//   res.render('patronViews/index', locals.patronsPg);
// });

/* GET patrons page. */
router.get('/patrons', function(req, res, next) {
  Patrons.findAll().then(function(patrons){
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
  res.render('./reusable/createNewForm', locals.patronsPg);
});

/* GET new patrons form page */
router.get('/patrons/patron_detail/:id', function(req, res, next) {
  res.locals.id = req.params.id;
  res.locals.columnArray = locals.loansPg.columnArray;
  res.locals.rowArray = locals.loansPg.rowArray[req.params.id];
  res.locals.title = "Patron";
  res.locals.patronName = locals.loansPg.rowArray[req.params.id].patron;
  res.locals.bookHrefPath = locals.loansPg.bookHrefPath;
  res.locals.patronHrefPath = locals.loansPg.patronHrefPath;
  res.locals.actionHrefPath = locals.loansPg.actionHrefPath;
  res.render('patronViews/patron_detail');
});

// add return_book route and hanlder here ??

// exporting router so it can be used by express app
module.exports = router;
