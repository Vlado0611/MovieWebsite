const accountRepository = require("../repositories/account-repository");

const getAllAccounts = async (req, res) => {
    const results = await accountRepository.getAllAccounts();
    res.send(results);
}

const getAccountByID = async (req, res) => {
    const id = req.params.id;
    const results = await accountRepository.getAccountByID(id);
    res.send(results);
}

const getAccountByUsername = async (req, res) => {
    const username = req.params.username;
    const results = await accountRepository.getAccountByUsername(username);
    res.send(results);
}

const insertAccount = async (req, res) => {
    const id = await accountRepository.insertAccount(req.body);
    res.send({id});
}

const updateAccount = async (req, res) => {
    const id = req.params.id;
    const results = await accountRepository.updateAccount(req.body, id);
    res.send(results);
}

const deleteAccount = async (req, res) => {
    const id = req.params.id;
    const results = await accountRepository.deleteAccount(id);
    res.send(results);
}

module.exports = {
    getAllAccounts,
    getAccountByID,
    getAccountByUsername,
    insertAccount,
    updateAccount,
    deleteAccount
}