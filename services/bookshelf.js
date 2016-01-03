var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.dev.sqlite3'
  },
  pool: {
    min: 1,
    max: 1
  }
});

var bookshelf = module.exports = require('bookshelf')(knex);
