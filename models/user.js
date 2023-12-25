'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: { msg: "Username cannot be empty" } }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Email cannot be empty" },
        isEmail: { msg: "Email format is incorrect" }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    working_since: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  user.prototype.toJSON = function () {
    const user = Object.assign({}, this.get());
    delete user.password;
    return user;
  }
  // user.beforeUpdate((user, options) => {
  //   if (options.fields.indexOf("password") > -1 && user.password) {
  //     const hashedPassword = helper.makeHash(user.password);
  //     user.password = hashedPassword;
  //   }
  // });

  // user.beforeCreate((user, options) => {
  //   const hashedPassword = helper.makeHash(user.password);
  //   user.password = hashedPassword;
  // });

  return user;
};