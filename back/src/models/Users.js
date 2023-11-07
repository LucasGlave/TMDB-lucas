const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {}

Users.init(
  {
    nombre: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    contraseña: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "users" }
);

Users.prototype.validarContraseña = function (contraseña) {
  return bcrypt
    .hash(contraseña, this.salt)
    .then((hash) => hash === this.contraseña);
};

Users.beforeCreate((user) => {
  return bcrypt.genSalt(8).then((salt) => {
    user.salt = salt;
    return bcrypt.hash(user.contraseña, salt).then((hash) => {
      user.contraseña = hash;
    });
  });
});

module.exports = Users;
