"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User", {
      id: {type: DataTypes.INTEGER, unique: true},
      username: DataTypes.STRING
    }, {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Page)
        }
      }
    });
  return User;
};
