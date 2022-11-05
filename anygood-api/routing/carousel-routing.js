const carouselRouter = require("../controllers/carousel-controller");
const express = require("express");
const router = express.Router();

router.route("/")
    .get(carouselRouter.getItems)
    .post(carouselRouter.insertItem)
    ;

router.route("/:id")
    .put(carouselRouter.updateItem)
    .delete(carouselRouter.deleteItem)
    ;

module.exports = router;