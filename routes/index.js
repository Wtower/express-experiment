var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  //models.User.where('id', 1).fetch({withRelated: ['posts.tags']}).then(function(user) {
  models.User.fetchAll().then(function(users) {
    //console.log(user.related('posts').toJSON());
    res.render('index', {
      title: 'Express',
      users: users
    });
  }).catch(function(err) {
    console.error(err);
  });
});

module.exports = router;
