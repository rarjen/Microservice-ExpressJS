const express = require("express");
const router = express.Router();
const userService = require("./user-service");

router.use("/", userService);

module.exports = router;
