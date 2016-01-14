/**
 * This is an example of a reusable module
 * Example in app.js:
 * services.bookshelf.user.fetchAll().then(function(users) {console.log(users); });
 */

function NineTESTD(o) {
  this.user = require('./models/user')(o);
}

module.exports = function(o) {
  return new NineTESTD(o);
};
