const jwt = require("jsonwebtoken");
const SECRET = "boquita";

const generarToken = (payload) => {
  const token = jwt.sign({ payload }, SECRET, { expiresIn: "4d" });
  return token;
};

const validarToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generarToken, validarToken };
