// This can be also invoked directly in models/index

"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      id: {type: DataTypes.INTEGER, primaryKey: true},
      username: {type: DataTypes.STRING, unique: true, validate: {is: /^[\w.@+-]+$/i}},
      password: {type: DataTypes.STRING, validate: {notEmpty: true}},
      email: {type: DataTypes.STRING, validate: {isEmail: true}},
      first_name: DataTypes.STRING(30),
      last_name: DataTypes.STRING(30),
      is_staff: DataTypes.BOOLEAN,
      is_active: DataTypes.BOOLEAN,
      is_superuser: DataTypes.BOOLEAN,
      date_joined: DataTypes.DATE,
      last_login: DataTypes.DATE
    },
    {
      tableName: 'User',
      timestamps: false    }
  );
  return User;
};
