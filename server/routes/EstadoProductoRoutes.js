const express = require("express");
const router = express.Router();

const estadoProducto = require("../controllers/EstadoProductoController");

router.get("/", estadoProducto.get);
router.get("/:id", estadoProducto.getById);

module.exports = router; 