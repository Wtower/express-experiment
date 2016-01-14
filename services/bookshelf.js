var knexFile = require('../knexfile.js');
var knex = require('knex')(knexFile.development);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

var user = require('../ninetestdir/modelst/user')(bookshelf);

module.exports = bookshelf;
module.exports.user = user;
