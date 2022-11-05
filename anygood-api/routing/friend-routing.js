const friendController = require("../controllers/friend-controller");
const express = require("express");
const router = express.Router();

router.route("/")
    .get(friendController.getFriendByIDs)
    .post(friendController.insertFriend)
    .delete(friendController.deleteFriend)
;

router.route("/:id")
    .get(friendController.getFriendsByID)
;

module.exports = router;