const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post("/auth", controllers.userService.create);
router.post("/login", controllers.userService.login);

module.exports = router;
