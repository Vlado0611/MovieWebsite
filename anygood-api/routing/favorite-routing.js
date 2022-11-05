const favoriteController = require("../controllers/favorite-controller");
const express = require("express");
const router = express.Router();

router.route("/")
    .get(favoriteController.getFavorite)
    .post(favoriteController.insertFavorite)
    .delete(favoriteController.deleteFavorite);

router.route("/:id")
    .get(favoriteController.getFavoritesByAccountID);

module.exports = router;