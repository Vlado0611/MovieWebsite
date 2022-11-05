const favoriteRepository = require("../repositories/favorite-repository");

const getFavoritesByAccountID = async (req, res) => {
    let id = req.params.id;
    const results = await favoriteRepository.getFavoritesByAccountID(id);
    res.send(results);
}

const getFavorite = async (req, res) => {
    let accId = req.query.account_id;
    let movieId = req.query.movie_id;

    const results = await favoriteRepository.getFavorite(accId, movieId);
    res.send(results);
}

const insertFavorite = async (req, res) => {
    const results = await favoriteRepository.insertFavorite(req.body);
    res.send({results});
}

const deleteFavorite = async (req, res) => {
    let accId = req.query.account_id;
    let movieId = req.query.movie_id;
    const results = await favoriteRepository.deleteFavorite(accId, movieId);
    res.send(results);
}

module.exports = {
    getFavorite,
    getFavoritesByAccountID,
    insertFavorite,
    deleteFavorite
}

