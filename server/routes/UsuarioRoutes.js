const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const usuarioController = require("../controllers/UsuarioController");

//Rutas de Usuarios
router.get("/", usuarioController.get);

router.get("/:id", usuarioController.getById);

module.exports = router;
