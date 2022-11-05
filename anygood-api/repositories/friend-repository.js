const dbConnection = require("../common/db-connection");

const getFriendsByID = async (id) => {
    const [results, metadata] = await dbConnection.query(`
     SELECT f.f1_id, f.f2_id, a1.username, a2.username 
     FROM friends f, account a1, account a2
     WHERE f.f1_id = a1.id AND f.f2_id = a2.id AND f.f1_id=?`, {
        replacements: [id, id]
    })

    return results;
}

const getFriendByIDs = async (id1, id2) => {
    const [results, metadata] = await dbConnection.query(`
    SELECT *
    FROM friends
    WHERE f1_id = ? AND f2_id = ?
    `, {
        replacements: [id1, id2]
    });

    return results;
}

const insertFriend = async (id1, id2) => {
    const [results, metadata] = await dbConnection.query(`INSERT INTO friends(f1_id, f2_id, dateCreated)
                                                        VALUES (?, ?, now())`, {
                                                            replacements: [id1, id2]
                                                        });

    return results;
}

const deleteFriend = async (id1, id2) => {
    const [results, metadata] = await dbConnection.query(`DELETE FROM friends WHERE f1_id = ? AND f2_id = ?`,{
        replacements: [id1,id2]
    });

    return results;
}

module.exports = {
    getFriendsByID,
    getFriendByIDs,
    insertFriend,
    deleteFriend
}