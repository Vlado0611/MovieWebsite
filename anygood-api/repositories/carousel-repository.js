const dbConnection = require("../common/db-connection");

const getItems = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM carousel ORDER BY order_no`);
    return results;
}

const insertItem = async(item) => {
    const [results, metadata] = await dbConnection.query(`INSERT INTO carousel(movie_id, filename, order_no)
    VALUES (?, ?, ?)`, {
        replacements: [item.movie_id, item.filename, item.order_no]
    })
    return results;
}

const updateItem = async(item, id) => {
    const [results, metadata] = await dbConnection.query(`
    UPDATE carousel
    SET movie_id = ?,
    filename = ?,
    order_no = ?    
    WHERE movie_id=?`, {
        replacements: [item.movie_id, item.filename, item.order_no, id]
    });

    return results;
}

const deleteItem = async(id) => {
    const [results, metadata] = await dbConnection.query(`DELETE FROM carousel WHERE movie_id=?`, {
        replacements: [id]
    });

    return results;
}

module.exports = {
    getItems,
    insertItem,
    updateItem,
    deleteItem
}
