const res = require("express/lib/response");
const carouselRepository = require("../repositories/carousel-repository");

const getItems = async (req, res) => {
    const results = await carouselRepository.getItems();
    res.send(results);
}

const insertItem = async(req, res) => {
    const results = await carouselRepository.insertItem(req.body);
    res.send({results});
}

const updateItem = async(req, res) => {
    const id = req.params.id;
    const results = await carouselRepository.updateItem(req.body, id);
    res.send(results);
}

const deleteItem = async(req, res) => {
    const id = req.params.id;
    const results = await carouselRepository.deleteItem(id);
    res.send(results);
}

module.exports = {
    getItems,
    insertItem,
    updateItem,
    deleteItem
}