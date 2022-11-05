const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie-controller");

router.route('/')
    .get(movieController.getAllMovies)
    .post(movieController.insertMovie)
;
router.route("/trending")
    .get(movieController.getTrending)
;
router.route("/search")
    .get(movieController.getSearchMovies)
;
router.route("/:id")
    .get(movieController.getMovieByID)
    .put(movieController.updateMovie)
    .delete(movieController.deleteMovie)
;


module.exports = router; 