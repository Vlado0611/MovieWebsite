const accountController = require("../controllers/account-controller");
const express = require("express");
const router = express.Router();

router.route("/")
    .get(accountController.getAllAccounts)
    .post(accountController.insertAccount)
;
router.route("/username/:username")
    .get(accountController.getAccountByUsername)
;
router.route("/:id")
    .get(accountController.getAccountByID)
    .put(accountController.updateAccount)
    .delete(accountController.deleteAccount)
;
module.exports = router;
