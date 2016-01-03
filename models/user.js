var services  = require('../services');
var checkit   = require('checkit');

var User = module.exports = services.bookshelf.Model.extend({
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
