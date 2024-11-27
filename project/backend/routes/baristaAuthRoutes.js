const express = require("express");
const router = express.Router();
const baristaAuthController = require("../controller/baristaAuthController");
const upload = require("../config/multer-config");
const auth = require("../middleware/auth");

router.post(
  "/create",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "culinarySchool", maxCount: 1 },
    { name: "portfolio", maxCount: 1 },
  ]),
  auth,
  baristaAuthController.createProfile
);
router.get("/profile", auth , baristaAuthController.getProfile);
router.get("/status", auth , baristaAuthController.getApplicationStatus);
router.put("/profile", auth , baristaAuthController.updateProfile);
router.put("/update-username", auth , baristaAuthController.updateUsername);
router.put("/update-profile-image", auth, upload.single("profileImage"), baristaAuthController.updateProfileImage);

module.exports = router;
