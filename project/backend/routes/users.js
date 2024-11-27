const express = require("express");
const router = express.Router();
const userController = require("./../controller/users");

router.post("/register/cheif", userController.registerBarista);
router.post("/login/cheif", userController.loginBarista);
router.post("/register/user", userController.registerUser);
router.post("/login/user", userController.loginUser);

router.post("/register/google", userController.googleSignup);
router.post("/login/google", userController.googleLogin);

// Check cookies route
router.get("/check-cookies", (req, res) => {
    const userId = req.cookies.userId;
    if (!userId) {
        return res.status(400).json({ error: 'userId cookie not found' });
    }
    res.json({ success: true, userId });
});

module.exports = router;

