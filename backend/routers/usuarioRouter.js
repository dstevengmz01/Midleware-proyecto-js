const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/userControllers");

router.post("/login", usuarioController.login);
router.post("/registrar", usuarioController.createUsuario);

module.exports = router;
