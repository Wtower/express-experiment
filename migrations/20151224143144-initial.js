'use strict';

//noinspection JSUnusedGlobalSymbols
module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      "User",
      {
        id: {type: Sequelize.INTEGER, primaryKey: true},
        username: {type: Sequelize.STRING, unique: true, validate: {is: /^[\w.@+-]+$/i}},
        password: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
        email: {type: Sequelize.STRING, validate: {isEmail: true}},
        first_name: Sequelize.STRING(30),
        last_name: Sequelize.STRING(30),
        is_staff: Sequelize.BOOLEAN,
        is_active: Sequelize.BOOLEAN,
        is_superuser: Sequelize.BOOLEAN,
        date_joined: Sequelize.DATE,
        last_login: Sequelize.DATE
      }
    );
    queryInterface.createTable(
      "Page",
      {
        id: {type: Sequelize.INTEGER, primaryKey: true},
        title: Sequelize.STRING,
        user_id: {type: Sequelize.INTEGER, references: {model: 'User', key: 'id'}, onUpdate: 'CASCADE'}
      }
    );
  },

  down: function (queryInterface) {
    queryInterface.dropTable('Page');
    queryInterface.dropTable('User');
  }
};
