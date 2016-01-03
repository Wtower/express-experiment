
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function (table) {
    table.increments();
    table.string('username');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  // drop table
};
