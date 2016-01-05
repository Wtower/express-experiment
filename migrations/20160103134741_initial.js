
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function (table) {
      table.increments();
      table.string('username');
      table.timestamps();
    }),
    knex.schema.createTable('page_type', function (table) {
      table.increments();
      table.string('name');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user'),
    knex.schema.dropTable('page_type')
  ]);
};
