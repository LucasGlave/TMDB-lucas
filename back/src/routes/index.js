const user = require("./user");
const favoritos = require("./favoritos");

const express = require("express");

const router = express.Router();

router.use("/user", user);
router.use("/favoritos", favoritos);

module.exports = router;
