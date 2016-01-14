var knexFile = require('../knexfile.js');
var knex = require('knex')(knexFile.development);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;

// example of using a model from a reusable module
var user = require('../reusable')(bookshelf).user;
module.exports.user = user;
