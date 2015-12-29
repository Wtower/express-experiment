'use strict';

//noinspection JSUnusedGlobalSymbols
module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      "User",
      {
        id: {type: Sequelize.INTEGER, unique: true},
        username: {type: Sequelize.STRING, unique: true, validate: {is: /^[\w.@+-]+$/i}},
        password: {type: Sequelize.STRING, validate: {notEmpty: true}},
        email: {type: Sequelize.STRING, validate: {isEmail: true}},
        first_name: Sequelize.STRING(30),
        last_name: Sequelize.STRING(30),
        is_staff: Sequelize.BOOLEAN,
        is_active: Sequelize.BOOLEAN,
        is_superuser: Sequelize.BOOLEAN,
        date_joined: Sequelize.DATE,
        last_login: Sequelize.DATE
      },
      {
        classMethods: {
          associate: function(models) {
            User.hasMany(models.Page)
          }
        }
      }
    );
    queryInterface.createTable(
      "Page",
      {
        title: Sequelize.STRING
      },
      {
        classMethods: {
          associate: function(models) {
            Page.belongsTo(models.User, {
              onDelete: "CASCADE",
              foreignKey: {
                allowNull: false
              }
            });
          }
        }
      }
    );
  },

  down: function (queryInterface) {
    queryInterface.dropTable('User');
    queryInterface.dropTable('Page');
  }
};
