const Sequelize = require("sequelize");
const db = require("../config/db");
const Users = require("./Users");

class Favorito extends Sequelize.Model {}

Favorito.init(
  {
    movieId: {
      type: Sequelize.DataTypes.INTEGER,
    },
  },
  { sequelize: db, modelName: "favorito" }
);

module.exports = Favorito;
