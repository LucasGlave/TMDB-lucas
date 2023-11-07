const router = require("express").Router();
const Users = require("../models/Users");
const { generarToken, validarToken } = require("../config/token");
const { validarUser } = require("../config/auth");

router.get("/", (req, res, next) => {
  Users.findAll().then((users) => {
    if (!users) res.send([]);
    res.send(users);
  });
});

router.post("/register", (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;
  console.log(req.body);
  Users.findOne({
    where: { email: email },
  }).then((result) => {
    if (result) return res.sendStatus(400);
    Users.create({
      nombre: nombre,
      apellido: apellido,
      email: email,
      contraseña: contraseña,
    }).then((usuario) => {
      res.status(201).send(usuario);
    });
  });
});

router.post("/login", (req, res) => {
  const { email, contraseña } = req.body;
  Users.findOne({ where: { email } }).then((usuario) => {
    if (!usuario) res.sendStatus(401);
    usuario.validarContraseña(contraseña).then((valido) => {
      if (!valido) res.sendStatus(401);
      const payload = {
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        id: usuario.id,
      };
      const token = generarToken(payload);
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Origin", "http://localhost:5173");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.cookie("token", token, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      });

      res.status(200).send(payload);
    });
  });
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { secure: false, expires: new Date(0) });
  res.sendStatus(204);
});

router.get("/me", validarUser, (req, res) => {
  res.send(req.user);
});

module.exports = router;
