var services  = require('../services');
var checkit   = require('checkit');

module.exports = services.bookshelf.model('User', {
  tableName: 'user',
  hasTimestamps: ['created_at', 'updated_at'],
  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave);
  },
  validateSave: function() {
    return new checkit({
      username: 'required'
    }).run(this.attributes);
  }
});
