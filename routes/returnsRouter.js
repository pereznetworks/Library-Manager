// importing express and setting up a router
var express = require('express');
var router = express.Router();

/* importing locals for rendering in pub templates */
var locals = require("../views/locals");

/* GET return books form page */
router.get('/return/return_book/:id', function(req, res, next) {
  // implement findOne query here...
  res.locals.id = req.params.id;
  res.locals.returnBook = "Return Book";
  res.locals.title = `Patron: Return Book`;
  res.locals.columnArray = locals.loansPg.columnArray;
  res.locals.rowArray = locals.loansPg.rowArray[req.params.id];
  res.render('returnBookViews/index');
});

// Add post return books route and handler here
  // update db with returned_on info
  // with redirect to page orginally clicked-through from

module.exports = router;
