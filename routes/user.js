var express = require('express');
var router = express.Router();
var models  = require('../models');

/* POST user */
router.post('/', function(req, res, next) {
  models.User.forge(req.body).save().then(function(user) {
    //res.json(user);
    res.redirect('/');
  }).catch(function(err) {
    console.error(err);
  });
});

module.exports = router;
