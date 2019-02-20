const express = require('express');
const bodyParser = require('body-parser');
const config = require('./db/config');
const users = require('./routes/users');
const companies = require('./routes/companies');
const carts = require('./routes/carts');
const orders = require('./routes/orders');
const cors = require('cors');
// const expressJwt = require('express-jwt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const DIR = '../orca/src/assets';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
let upload = multer({storage: storage});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use((req , res , next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    next();
});

app.use('/users' , users);
app.use('/companies' , companies);
app.use('/carts' , carts);
app.use('/orders' , orders);

app.post('/api/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.status(200).send('ok');
    }
});

app.listen(config.app.port, () => {
    console.log(`Server started on port: ${config.app.port}`);
});
