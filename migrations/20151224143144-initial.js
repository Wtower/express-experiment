'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      "User",
      {
        username: Sequelize.STRING
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

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('User');
    queryInterface.dropTable('Page');
  }
};
