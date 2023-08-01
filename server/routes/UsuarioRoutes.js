const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const usuarioController = require("../controllers/UsuarioController");

//Rutas de Usuarios
router.get("/", usuarioController.get);

router.post("/", usuarioController.create);

router.put("/", usuarioController.update);

router.get("/:id", usuarioController.getById);

router.post("/login", usuarioController.login);



module.exports = router;
