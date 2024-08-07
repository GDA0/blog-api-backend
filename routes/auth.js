const express = require("express");

const authController = require("../src/controllers/auth");

const router = express.Router();

router.post("/signup", authController.handleSignUpPost);
router.post("/login", authController.handleLogInPost);
router.post("/logout", authController.handleLogOutPost);

module.exports = router;
