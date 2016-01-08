var knexFile = require('../knexfile.js');
var knex = require('knex')(knexFile.development);
module.exports = require('bookshelf')(knex);
