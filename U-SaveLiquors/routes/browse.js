var express = require('express');
var router = express.Router();

/* GET browse page. */
router.get('/', function(req, res, next) {
  res.render('browse');
});

module.exports = router;
