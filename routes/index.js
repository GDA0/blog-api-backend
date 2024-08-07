const express = require("express");

const authenticate = require("../src/middlewares/authenticate");
const indexController = require("../src/controllers/index");

const router = express.Router();

router.get("/", authenticate, indexController.handleIndexGet);

module.exports = router;
