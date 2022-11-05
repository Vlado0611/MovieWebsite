const dbConnection = require("../common/db-connection");

const getAllMovies = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM movie`);
    return results;
}

const getMovieByID = async (id) => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM movie WHERE id = ?`, {
        replacements: [id]
    })
    return results[0];
}

const getTrending = async() => {
    const [results, metadata] = await dbConnection.query(`
    SELECT * 
    FROM
        (SELECT m.id, m.filename, COUNT(*) as commentNmbr
        FROM movie m INNER JOIN comment c ON m.id = c.movie_id
        GROUP BY m.id)
        AS t
    ORDER BY commentNmbr DESC
    LIMIT 12`);

    return results;
}

const getSearchMovies = async(search) => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM movie`);
    const resArr = [];
    results.forEach( (value) => {

        if(value.title.toLowerCase().includes(search.toLowerCase())){
            resArr.push(value);
        }
    });

    return resArr;
}

const insertMovie = async (movie) => {
    const [results, metadata] = await dbConnection.query(
        `   INSERT INTO movie(title, filename, duration, releaseYear, description, dateCreated, dateUpdated) 
            VALUES(?, ?, ?, ?, ?,now(), now())`,{
            replacements: [movie.title, movie.filename, movie.releaseYear ,movie.duration, movie.description]
        })
    return results;
}

const updateMovie = async (movie, id) => {
    const [results, metadata] = await dbConnection.query(
        `   UPDATE movie 
            SET title = ?,
            filename = ?,
            releaseYear = ?,
            duration = ?,
            description = ?,
            dateUpdated = now()
            WHERE id = ?`,{
                replacements: [movie.title, movie.filename, movie.releaseYear, movie.duration, movie.description, id]
            }
    )

    return results;
}

const deleteMovie = async (id) => {
    const [results, metadata] = await dbConnection.query(`DELETE FROM movie WHERE id = ?`, {replacements: [id]});
    return results;
}

module.exports = {
    getAllMovies,
    getMovieByID,
    getTrending,
    getSearchMovies,
    insertMovie,
    updateMovie,
    deleteMovie
}