var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/main', function(req, res, next) {
  res.render('admin-index');
});
router.get('/create_exam', function(req, res, next) {
  res.render('admin-create_exam');
});

module.exports = router;
