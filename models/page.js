"use strict";

module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define(
    "Page",
    {
      title: DataTypes.STRING
    },
    {
      tableName: 'Page',
      timestamps: false,
      classMethods: {
        associate: function(models) {
          Page.belongsTo(models.User, {
            onDelete: "SET NULL",
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Page;
};
