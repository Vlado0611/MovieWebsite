const express = require("express");
const expressjwt = require('express-jwt').expressjwt;
const dbConnection = require("./common/db-connection");
const movieRouting = require("./routing/movie-routing");
const accountRouting = require("./routing/account-routing");
const commentRouting = require("./routing/comment-routing");
const loginRouting = require("./routing/login-routing");
const carouselRouting = require("./routing/carousel-routing");
const imageRouting = require("./routing/image-routing");
const favoriteRouting = require("./routing/favorite-routing");
const friendRouting = require("./routing/friend-routing");
const path = require('path');

var cors = require('cors');
const app = express();

let auth = expressjwt({
    secret:'internettechnologiessecretkey',
    userProperty: 'body.userData',
    algorithms: ['HS256']
});

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/uploads')));
app.use('/upload', imageRouting);

app.use("/movies", movieRouting);
app.use("/accounts", accountRouting);
app.use("/comments", commentRouting);
app.use("/login", loginRouting);
app.use("/carousel", carouselRouting);
app.use("/favorite", favoriteRouting);
app.use("/friends", friendRouting);

app.listen(3001, () => {
    console.log("Server is listening on port 3001");
})

dbConnection.authenticate()
            .then(connection => {
                console.log("Connection established");
            })
            .catch(err => {
                console.log("Error while connecting to database");
            })