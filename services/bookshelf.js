var knexFile = require('../knexfile.js');
var knex = require('knex')(knexFile.development);
var bookshelf = module.exports = require('bookshelf')(knex);
