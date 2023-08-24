const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const usuarioController = require("../controllers/UsuarioController");

//Rutas de Usuarios
router.get("/", usuarioController.get);

router.put("/:id", usuarioController.update);  
router.get("/:id", usuarioController.getById);

router.post("/registrar", usuarioController.create);
router.post("/login", usuarioController.login);

router.put("/activacion/:id", usuarioController.cambiarActivacion);
router.put("/evaluacion/:id", usuarioController.actualizarCalificacion);



module.exports = router;
