const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

module.exports.io = io;

const { authenticate } = require('./middleware/authenticate');
const User = require('./mongoDB/models/user');

const backnetLoop = require('./backnet/BACnetLoop');
const buffer = require('./backnet/dataBuffer');
const trendLoop = require('./services/trendLoop');

const configAVs = require('./backnet/configAV_data');
const configBVs = require('./backnet/configBV_data');
const configAIs = require('./backnet/configAI_data');
const configAOs = require('./backnet/configAO_data');
const configBIs = require('./backnet/configBI_data');
const configBOs = require('./backnet/configBO_data');

const allPoints = [...configAVs, ...configAIs, ...configAOs, ...configBVs, ...configBIs, ...configBOs];
buffer.readDataFromConfig(allPoints);

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
} = require('./mongoDB/config');

const dataBaseLink = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

mongoose.connect(dataBaseLink);

const mongoDB = require('./mongoDB/MongoDB');

const port = process.env.PORT || '3000';

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/buffer', authenticate, (req, res) => {
    res.send(JSON.stringify(buffer.getData()));
});

//app.post('/trend', authenticate, (req, res) => {
app.post('/trend', (req, res) => {
    const query = req.body;
    mongoDB.getTrendData(
        query.title,
        query.startTime,
        query.endTime
    )
        .then((trendData) => {
            res.json(trendData);
        })
        .catch((err) => {
            throw err;
        });
});

app.post('/users/login', (req, res) => {
    console.log('body: ', req.body);
    User.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (err) {
            console.log('ERR', err);
            res.status(401).send();
        }
        if (user) {
            res.status(200).send(jwt.sign({ email: user.email }, 'abc123').toString());
        } else {
            res.status(401).send();
            console.log('no users');
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

server.listen(port, (req, res) => {
    console.log(`Server run on port ${port}!`);
});

backnetLoop.run();
trendLoop.run();
