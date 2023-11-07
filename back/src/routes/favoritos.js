const router = require("express").Router();
const { Favorito, Users } = require("../models");

router.post("/:userId", (req, res) => {
  const { movieId } = req.body;
  const { userId } = req.params;
  Users.findOne({ where: { id: userId } })
    .then((usuario) => {
      if (!usuario) res.sendStatus(401);
      Favorito.findOne({
        where: { movieId, userId },
      }).then((filtro) => {
        if (filtro) {
          res.sendStatus(401);
        } else {
          Favorito.create({ movieId }).then((fav) => {
            fav.setUser(userId);
            res.send(fav);
          });
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error interno del servidor");
    });
});

router.get("/", (req, res) => {
  Favorito.findAll().then((favs) => res.send(favs));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findOne({ where: { id } }).then((usuario) => {
    if (!usuario) res.sendStatus(401);
    Favorito.findAll({ where: { userId: id } }).then((favs) => res.send(favs));
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const { movieId } = req.body;
  Users.findOne({ where: { id } }).then((usuario) => {
    if (!usuario) res.sendStatus(401);
    Favorito.destroy({
      where: { "favorito.movieId": movieId, userId: id },
    })
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(401));
  });
});

module.exports = router;
