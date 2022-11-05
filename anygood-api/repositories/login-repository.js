const dbConnection = require("../common/db-connection");

const login = async (username, password) => {
    const results = await dbConnection.query(`SELECT * FROM account WHERE username=? AND password=?`, {
        replacements: [username, password]
    });

    return results;
}

module.exports = {
    login
}