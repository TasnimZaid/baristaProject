// routes/ordersMRouter.js
const express = require("express");
const {
  createOrder,
  getUserOrders,
} = require("../Controllers/ordersMController");

const router = express.Router();

router.post("/create", createOrder);
router.get("/user/:userId", getUserOrders);

module.exports = router;
