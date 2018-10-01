var express = require('express');
var router = express.Router();

var books = require("../models").books;
var patrons = require("../models").patrons;
var loans = require("../models").loans;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
