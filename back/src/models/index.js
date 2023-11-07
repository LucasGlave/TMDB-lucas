const Favorito = require("./Favorito");
const Users = require("./Users");

Favorito.belongsTo(Users, { as: "user" });
Users.hasMany(Favorito);

module.exports = { Favorito, Users };
