function BS(b) {
  this.bookshelf = b;
}

var bookshelf ;

module.exports = function(b) {
  //bookshelf = b;
  console.log('servicest');
  //console.log(b);
  //if (!bookshelf) bookshelf = new BS(b);
  //return bookshelf;
  return new BS(b);
};

//module.exports.getbs = function() {
//  return bookshelf;
//};
