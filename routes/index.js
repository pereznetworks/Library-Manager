var express = require('express');
var router = express.Router();

/* importing sequelize models */
var Book = require("../models").Book;
var Patron = require("../models").Patron;
var Loan = require("../models").Loan;

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', locals.homePg);
});

// exporting router so it can be used by express app
module.exports = router;
