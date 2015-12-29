'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('User',
      'id', {type: Sequelize.INTEGER, unique: true});
    // This won't work
    // https://github.com/sequelize/sequelize/issues/2051
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('User', 'id');
  }
};
