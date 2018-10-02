var express = require('express');
var router = express.Router();

/* importing sequelize models */
var books = require("../models").books;
var patrons = require("../models").patrons;
var loans = require("../models").loans;

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', locals.homePg);
});

/* GET books page. */
router.get('/books', function(req, res, next) {
  res.render('books', locals.booksPg);
});

/* GET loans page. */
router.get('/loans', function(req, res, next) {
  res.render('loans', locals.loansPg);
});

/* GET patrons page. */
router.get('/patrons', function(req, res, next) {
  res.render('patrons', locals.patronsPg);
});

module.exports = router;
