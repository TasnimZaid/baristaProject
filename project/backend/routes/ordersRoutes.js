const express = require("express");
const router = express.Router();
const statsController = require("../Controllers/ordersController");
const auth = require("../middleware/auth");

router.get("/barista-stats", auth, statsController.getBaristaStats);

module.exports = router;
