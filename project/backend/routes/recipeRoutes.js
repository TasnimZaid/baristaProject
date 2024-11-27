const express = require("express");
const router = express.Router();
const recipeController = require("../controller/recipeController");
const upload = require("../config/multer-config");
const auth = require("../middleware/auth");

router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  auth,
  recipeController.createRecipe
);
router.get("/get", auth, recipeController.getAllRecipes);

router.put(
  "/update/:id",
  auth,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  recipeController.updateRecipe
);


router.delete("/delete/:id", auth, recipeController.deleteRecipe);

module.exports = router;
