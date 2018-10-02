// importing express and setting up a router
var express = require('express');
var router = express.Router();

/* importing locals for rendering in pub templates */
var locals = require("../views/locals");

/* GET books page. */
router.get('/books', function(req, res, next) {
  res.render('books', locals.booksPg);
});

// exporting router so it can be used by express app
module.exports = router;
