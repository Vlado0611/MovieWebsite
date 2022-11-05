const dbConnection = require("../common/db-connection");

const getAllComments = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM comment`);
    return results;
}

const getCommentsByMovieID = async (id) => {
    const [results, metadata] = await dbConnection.query(`SELECT t1.comment_no, t1.movie_id, t1.account_id, 
    t1.stars_no, t1.title, t1.description, t2.username, t2.profileImage 
    FROM comment t1 INNER JOIN account t2 ON t1.account_id=t2.id 
    WHERE movie_id = ?`, {
        replacements: [id]
    });
    
    return results;
}

const getCommentsByAccountID = async (id) => {
    const [results, metadata] = await dbConnection.query(`
    SELECT c.comment_no, c.movie_id, c.account_id, c.stars_no, c.title, c.description, c.dateCreated, m.title AS movieTitle 
     FROM comment c INNER JOIN movie m ON c.movie_id = m.id
     WHERE account_id = ?
     ORDER BY c.dateCreated DESC
     `, {
        replacements: [id]
    });
    
    return results;
}

const getCommentsByCommentID = async (id) =>{
    
    const [results, metadata] = await dbConnection.query(`SELECT * FROM comment WHERE comment_no = ?`, {
        replacements: [id]
    });
    
    return results;
}

const insertComment = async (comment) => {
    const [results, metadata] = await dbConnection.query(
        `INSERT INTO comment(movie_id, account_id, stars_no, title, description, dateCreated, dateUpdated)
        VALUES (?, ?, ?, ?, ?,now(), now())`, {
            replacements: [comment.movie_id, comment.account_id, comment.stars_no, comment.title, comment.description]
        })

    return results;
}

const updateComment = async (comment, id) => {
    const [results, metadata] = await dbConnection.query(
        `UPDATE comment
        SET movie_id = ?,
        account_id = ?,
        stars_no = ?,
        title = ?,
        description = ?,
        dateUpdated = now()
        WHERE comment_no = ?`, {
            replacements: [comment.movie_id, comment.account_id, comment.stars_no, comment.title, comment.description, id]
        });

    return results;
}

const deleteComment = async (id) => {
    const [results, metadata] = await dbConnection.query(`DELETE FROM comment WHERE comment_no = ?`, {
        replacements: [id]
    });

    return results;
}

module.exports = {
    getAllComments,
    getCommentsByAccountID,
    getCommentsByMovieID,
    getCommentsByCommentID,
    insertComment,
    updateComment,
    deleteComment
}