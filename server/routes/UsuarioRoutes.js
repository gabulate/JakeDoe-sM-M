const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const usuarioController = require("../controllers/UsuarioController");

//Rutas de Usuarios
router.get("/", usuarioController.get);

router.post("/", usuarioController.create);

router.get("/:id", usuarioController.getById);

router.put("/:id", usuarioController.update)

module.exports = router;
