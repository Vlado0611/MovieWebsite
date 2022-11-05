const dbConnection = require("../common/db-connection");

const getFavoritesByAccountID = async (id) => {
    const[results, metadata] = await dbConnection.query(`SELECT f.account_id, m.id, m.title, m.filename
     FROM favorite f INNER JOIN movie m ON f.movie_id = m.id
     WHERE account_id = ? `, {
        replacements: [id]
    });

    return results;
}

const getFavorite = async (accId, movieId) => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM favorite WHERE account_id = ? AND movie_id = ?`, {
        replacements: [accId, movieId]
    });

    return results;
}

const insertFavorite = async (favorite) => {
    const [results, metadata] = await dbConnection.query(`INSERT INTO favorite(account_id, movie_id) VALUES (?, ?) `, {
        replacements: [favorite.account_id, favorite.movie_id]
    });

    return results;
}

const deleteFavorite = async (accId, movieId) => {
    const [results, metada] = await dbConnection.query(`DELETE FROM favorite WHERE account_id = ? AND movie_id = ?`, {
        replacements: [accId, movieId]
    });

    return results;
}

module.exports = {
    getFavoritesByAccountID,
    getFavorite,
    insertFavorite,
    deleteFavorite
}