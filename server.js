const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    DATABASE_USER_NAME,
    DATABASE_USER_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
} = require('./mongoDB/config');

//const dataBaseLink = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
const dataBaseLink = `mongodb://${DATABASE_USER_NAME}:${DATABASE_USER_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;


mongoose.connect(dataBaseLink, {
    useCreateIndex: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((e) => {
        console.log('[ERROR] with connection to MongoDB: ', e);
    });

const mongoDB = require('./mongoDB/MongoDB');

const port = process.env.PORT || '3000';

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/buffer', (req, res) => { //TODO: delete in prod
    res.send(JSON.stringify(buffer.getData()));
});

app.post('/trend', authenticate, (req, res) => {
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
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(401).send(err);
        }
        if (user) {
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (result) {
                    res.status(200).send(jwt.sign({ email: user.email }, 'abc123').toString());
                } else {
                    res.status(401).send(error);
                }
            });
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
