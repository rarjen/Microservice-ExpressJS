const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const mid = require("../utils");

router.post("/auth/register", controllers.create);
router.post("/auth/login", controllers.login);
router.put("/auth/password", mid.authUser, controllers.changePassword);

module.exports = router;
