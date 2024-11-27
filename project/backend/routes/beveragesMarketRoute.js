const express = require("express");
const beveragesMarket = require("../controller/beveragesMarket");

const router = express.Router();

router.get("/allBeverages", beveragesMarket.getAllBeverages);

module.exports = router;
