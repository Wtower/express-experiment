//var services  = require('../').settings;
//var services  = require('../../services');

var services  = require('../servicest/bookshelf');
console.log('ninetest user');
//console.log(services.bookshelf);

module.exports = services.bookshelf.model('User2', {
  tableName: 'user',
  hasTimestamps: ['created_at', 'updated_at']
});

//module.exports = function() {
//  console.log('user exported');
//};

//var User = services.bookshelf.Model('User', {
//  tableName: 'user',
//  hasTimestamps: ['created_at', 'updated_at']
//});
//module.exports = services.bookshelf.model('User', User);

//module.exports = function() {
//  console.log('in function user');
//  console.log(services.bookshelf);
//  return services.bookshelf.model('User2', {
//    tableName: 'user',
//    hasTimestamps: ['created_at', 'updated_at']
//  });
//};
