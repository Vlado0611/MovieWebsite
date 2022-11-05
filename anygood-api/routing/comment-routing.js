const commentController = require("../controllers/comment-controller");
const express = require("express");
const router = express.Router();

router.route("/")
    .get(commentController.getAllComments)
    .post(commentController.insertComment)

router.route("/movies/:id")
    .get(commentController.getCommentsByMovieID)

router.route("/accounts/:id")
    .get(commentController.getCommentsByAccountID)

router.route("/:id")
    .get(commentController.getCommentsByCommentID)
    .put(commentController.updateComment)
    .delete(commentController.deleteComment)

module.exports = router;