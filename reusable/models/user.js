module.exports = function(bookshelf) {
  return bookshelf.model('User2', bookshelf.Model.extend({
    tableName: 'user',
    hasTimestamps: ['created_at', 'updated_at']
  }));
};
