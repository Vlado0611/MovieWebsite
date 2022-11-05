const multer = require('multer');
const express = require('express');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../public/uploads'))
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname)
    }
});

fileUpload = multer({ storage: storage });


const uploadRouter = express.Router();

// uploadRouter.route('/upload').post(sdas)
uploadRouter.post('/',

    fileUpload.single('file'),

    (req, res) => {
        if (!req.file) {
            res.send({
                status: -1,
                msg: 'No file uploaded!'
            })
        } else {
            res.send({
                status: 0,
                msg: 'File uploaded',
                filename: req.file.filename
            })
        }
    })

module.exports = uploadRouter;