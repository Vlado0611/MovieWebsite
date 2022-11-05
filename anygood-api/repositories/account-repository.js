const dbConnection = require("../common/db-connection");

const getAllAccounts = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM account`);
    return results;
}

const getAccountByID = async (id) => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM account WHERE id = ?`, {
        replacements: [id]
    });
    return results;
}

const getAccountByUsername = async (username) => {
    const [results, metadata] = await dbConnection.query(`SELECT id FROM account WHERE username = ? `, {
        replacements: [username]
    });
    return results;
}

const insertAccount = async (account) => {

    const [results, metadata] = await dbConnection.query(
        `INSERT INTO account(username, email, password, name, surname, description, gender, dateCreated, dateUpdated, admin, profileImage)
        VALUES (?, ?, ?, ?, ?, ?, ?, now(), now(), ?, ?)`, {
            replacements: [account.username, account.email, account.password, account.name, account.surname, account.description, account.gender, account.admin, account.filename]
        });
    
    return results;
} 

const updateAccount = async (account, id) => {
    const [results, metadata] = await dbConnection.query(   
        `UPDATE account
        SET username = ?,
        email = ?,
        password = ?,
        name = ?,
        surname = ?,
        gender = ?,
        description = ?,
        dateUpdated = now(),
        admin = ?,
        profileImage = ?
        WHERE id = ?`,{
            replacements: [account.username, account.email, account.password, 
                            account.name, account.surname, account.gender, account.description,
                            account.admin, account.filename, id]
        }
    );

    return results;
}

const deleteAccount = async (id) => {
    const [results, metadata] = await dbConnection.query(
        `DELETE FROM account WHERE id = ?`, {
            replacements: [id]
        }
    );

    return results;
}

module.exports = {
    getAllAccounts,
    getAccountByID,
    getAccountByUsername,
    insertAccount,
    updateAccount,
    deleteAccount
}