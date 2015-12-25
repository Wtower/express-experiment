'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('User', 
      id, {type: Sequelize.INTEGER, unique: true});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('User', 'id');
  }
};
