const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const mid = require("../utils");

router.post("/auth/register", controllers.userService.create);
router.post("/auth/login", controllers.userService.login);
router.put(
  "/auth/password",
  mid.authUser,
  controllers.userService.changePassword
);

module.exports = router;
