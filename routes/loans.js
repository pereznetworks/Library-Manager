// importing express and setting up a router
var express = require('express');
var router = express.Router();

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET loans page. */
router.get('/loans', function(req, res, next) {
  res.render('loans', locals.loansPg);
});

// exporting router so it can be used by express app
module.exports = router;
