const commentRepository = require("../repositories/comment-repository");

const getAllComments = async (req, res) => {
    const results = await commentRepository.getAllComments();
    res.send(results);
}

const getCommentsByMovieID = async (req, res) => {
    const id = req.params.id;
    const results = await commentRepository.getCommentsByMovieID(id);
    res.send(results);
}

const getCommentsByAccountID = async (req, res) => {
    const id = req.params.id;
    const results = await commentRepository.getCommentsByAccountID(id);
    res.send(results);
}

const getCommentsByCommentID = async (req, res) => {
    const id = req.params.id;
    const results = await commentRepository.getCommentsByCommentID(id);
    res.send(results);
}

const insertComment = async (req, res) => {
    const id = await commentRepository.insertComment(req.body);
    res.send({id});
}

const updateComment = async (req, res) => {
    const id = req.params.id;
    const results = await commentRepository.updateComment(req.body, id);
    res.send(results);
}

const deleteComment = async (req, res) => {
    const id = req.params.id;
    const results = await commentRepository.deleteComment(id);
    res.send(results);
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