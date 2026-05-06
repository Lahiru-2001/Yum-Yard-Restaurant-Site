const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/cartController");


router.post("/create", createOrder);

module.exports = router;