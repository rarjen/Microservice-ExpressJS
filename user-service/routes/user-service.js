const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post("/auth", controllers.create);
router.post("/account", controllers.login);
router.put("/account/password", controllers.changePassword);

module.exports = router;
