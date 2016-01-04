var services  = require('../services');
var checkit   = require('checkit');

module.exports = services.bookshelf.Model.extend({
  tableName: 'page_type',
  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave);
  },
  validateSave: function() {
    return new checkit({
      name: 'required'
    }).run(this.attributes);
  }
});
