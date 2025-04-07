const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/userControllers");
const authorization = require("../mildeware/authorizathion");
router.post("/login", usuarioController.login, authorization);
router.post("/registrar", usuarioController.createUsuario);

module.exports = router;
