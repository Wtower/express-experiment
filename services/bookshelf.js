var knexFile = require('../knexfile.js');
var knex = require('knex')(knexFile.development);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;
