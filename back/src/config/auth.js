const { validarToken } = require("../config/token");

function validarUser(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    const { payload } = validarToken(token);
    req.user = payload;
    if (payload) return next();
    res.sendStatus(401);
  }
  res.sendStatus(401);
}

module.exports = { validarUser };
