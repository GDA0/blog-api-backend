const express = require("express");

const authController = require("../src/controllers/auth");

const router = express.Router();

router.post("/signup", authController.handleSignUpPost);

module.exports = router;
