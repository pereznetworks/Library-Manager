var express = require('express');
var router = express.Router();

/* importing locals for rendering in pub templates */
var locals = require("../views/locals")

/* GET patrons page. */
router.get('/patrons', function(req, res, next) {
  res.render('patrons', locals.patronsPg);
});

module.exports = router;
