const express = require("express");
const router = express.Router();
const beverageController = require("../controller/addBeverage");
const upload = require("../config/multer-config");
const auth = require("../middleware/auth");

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  auth,
  beverageController.createBeverage
);
router.get("/get", auth, beverageController.getAllBeverages);
router.delete("/del/:id", beverageController.deleteBeverage);
router.put("/update/:id", auth, upload.single("image"), beverageController.updateBeverage);

router.get("/syrups", auth, beverageController.AllSyrups);
module.exports = router;
