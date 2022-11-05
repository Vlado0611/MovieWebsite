const friendRepository = require("../repositories/friend-repository");

const getFriendsByID = async (req, res) => {
    const id = req.params.id;
    const results = await friendRepository.getFriendsByID(id);
    res.send(results);
}

const getFriendByIDs = async (req, res) => {
    const id1 = req.query.id1;
    const id2 = req.query.id2;

    const results = await friendRepository.getFriendByIDs(id1, id2);
    res.send(results);
}

const insertFriend = async (req, res) => {
    const id1 = req.query.id1;
    const id2 = req.query.id2;
    
    const results = await friendRepository.insertFriend(id1, id2);
    res.send({results});
}

const deleteFriend = async (req, res) => {
    const id1 = req.query.id1;
    const id2 = req.query.id2;
    
    const results = await friendRepository.deleteFriend(id1, id2);
    res.send(results);
}

module.exports = {
    getFriendsByID,
    getFriendByIDs,
    insertFriend,
    deleteFriend
}