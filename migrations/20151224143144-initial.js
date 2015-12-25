'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return 
      queryInterface
        .createTable(
          "User", {
            username: Sequelize.STRING
          }, {
            classMethods: {
              associate: function(models) {
                User.hasMany(models.Page)
              }
            }
          }
        )
      .then(function(queryInterface, Sequelize) { return queryInterface.createTable(
        "Page", {
          title: Sequelize.STRING
        }, {
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
      );});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('User')
      .dropTable('Page');
  }
};
