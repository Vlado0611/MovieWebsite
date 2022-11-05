const movieRepository = require("../repositories/movie-repository");

const getAllMovies = async (req, res) => {
    const results = await movieRepository.getAllMovies();
    res.send(results);
}

const getMovieByID = async (req, res) => {
    const id = req.params.id;
    const results = await movieRepository.getMovieByID(id);
    res.send(results);
}

const getTrending = async (req, res) => {
    const results = await movieRepository.getTrending();
    res.send(results);
}

const getSearchMovies = async (req, res) => {
    const search = req.query.search;
    const results = await movieRepository.getSearchMovies(search);
    res.send(results);
}

const insertMovie = async (req, res) => {
    const id = await movieRepository.insertMovie(req.body);
    res.send({id});
}

const updateMovie = async (req, res) => {
    const id = req.params.id;
    const results = await movieRepository.updateMovie(req.body, id);
    res.send(results);
}

const deleteMovie = async (req, res) => {
    const id = req.params.id;
    const results = await movieRepository.deleteMovie(id);
    res.send(results);
}

module.exports = {
    getAllMovies,
    getMovieByID,
    getTrending,
    getSearchMovies,
    insertMovie,
    updateMovie,
    deleteMovie
};