const loginController = require("../controllers/login-controller");

const express = require("express");
const router = express.Router();

router.route("/").post(loginController.login)
router.route("/auth").post(loginController.verifyLogin);

module.exports = router
    