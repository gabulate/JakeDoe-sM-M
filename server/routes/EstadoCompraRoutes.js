const express = require("express");
const router = express.Router();

const estadoCompra = require("../controllers/EstadoCompraController");

router.get("/", estadoCompra.get);

module.exports = router; 