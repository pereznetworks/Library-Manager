var express = require('express');
var router = express.Router();

/* importing sequelize db */
var db = require('../models/index.js');

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', locals.homePg);
});

// exporting router so it can be used by express app
module.exports = router;
