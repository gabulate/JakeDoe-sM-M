const express = require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const DireccionController = require("../controllers/DireccionController");

//router.get("/", MetodoPagoController.get);

router.post("/", DireccionController.create);

router.get("/:id", DireccionController.getByUsuario);

router.put("/:id", DireccionController.update)

module.exports = router;