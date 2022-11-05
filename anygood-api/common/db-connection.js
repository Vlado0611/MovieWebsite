const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('movies', 'root', '', {
    host:'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;