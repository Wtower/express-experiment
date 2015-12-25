"use strict";

module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define(
    "Page", {
      title: DataTypes.STRING
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
    });
  return Page;
};
