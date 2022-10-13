const express = require("express");
const router = express.Router();
const userService = require("./user-service");
const home = require("./home");

router.get("/", (req, res) => res.redirect("/home"));

router.use("/home", home);
router.use("/auth", userService);

module.exports = router;
