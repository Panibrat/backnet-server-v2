const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('./SQLite3/SQLite');
const { insertUsersToDataBase } = require('./SQLite3/insertUsers');
const { users } = require('./SQLite3/users');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

module.exports.io = io;

const mongoDB = require('./mongoDB/MongoDB');
const fireBase = require('./fireBaseDB/FireBaseDB');
const socketIO = require('./socketIO/SocketIO');

const { authenticate } = require('./middleware/authenticate');
const User = require('./mongoDB/models/user');

const modbusLoop = require('./modbus/modbusLoop');
const backnetLoop = require('./backnet/BACnetLoop');
const buffer = require('./backnet/dataBuffer');
const trendLoop = require('./services/trendLoop');

const configAVs = require('./backnet/configAV_data');
const configBVs = require('./backnet/configBV_data');
const configAIs = require('./backnet/configAI_data');
const configAOs = require('./backnet/configAO_data');
const configBIs = require('./backnet/configBI_data');
const configBOs = require('./backnet/configBO_data');

insertUsersToDataBase(users, sqlite3);

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
    useNewUrlParser: true,
})
    .then(() => {
        console.log('connected to MongoDB');
        console.log('test HP G2');
    })
    .catch((e) => {
        console.log('[ERROR] with connection to MongoDB: ', e);
    });


const port = process.env.PORT || '3000';

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/buffer', (req, res) => { // TODO: delete in prod
    res.send(JSON.stringify(buffer.getData()));
});

app.get('/modbus', (req, res) => { // TODO: delete in prod
    res.send(JSON.stringify(modbusLoop.getBuffer()));
});

app.post('/day-consumption', authenticate, (req, res) => {
    const query = req.body;
    const callback = (data) => {
        return res.json(data);
    };
    sqlite3.getConsumptionTrendData(query.title, query.startTime, query.endTime, callback);
});

app.post('/year-consumption', authenticate, (req, res) => {
    const query = req.body;
    const callback = (data) => {
        return res.json(data);
    };
    sqlite3.getConsumptionByYear(query.title, callback);
});

app.post('/week-consumption', authenticate, (req, res) => {
    const query = req.body;
    const callback = (data) => {
        return res.json(data);
    };
    sqlite3.getConsumptionByDaysOfWeek(query.title, query.startTime, query.endTime, callback);
});


app.post('/month-consumption', authenticate, (req, res) => {
    const query = req.body;
    const callback = (data) => {
        return res.json(data);
    };
    sqlite3.getConsumptionByMounth(query.title, query.startTime, query.endTime, callback);
});

app.post('/trend', authenticate, (req, res) => {
    const query = req.body;
    const callback = (data) => {
        const index = configAIs.findIndex(item => item.title === data.title);
        if (index !== -1) {
            data.name = configAIs[index].name;
            data.description = configAIs[index].description;
            data.colorTrend = configAIs[index].colorTrend;
        }
        return res.json(data);
    };
    sqlite3.getTrendData(query.title, query.startTime, query.endTime, callback);
});

app.post('/users/login', (req, res) => {
    const callback = (err, user) => {
        if (err) {
            res.status(401).send(err);
        }
        if (user) {
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (result) {
                    res.status(200).send(jwt.sign({ email: user.email, role: user.role }, 'abc123').toString()); // TODO: change key on prod to key from ENV
                } else {
                    res.status(401).send(error);
                }
            });
        }
    };
    sqlite3.findUser(req.body.email, callback);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

server.listen(port, (req, res) => {
    console.log(`Server run on port ${port}!`);
});

buffer.setDataListeners(mongoDB);
buffer.setDataListeners(fireBase);
buffer.setDataListeners(socketIO);
buffer.setDataListeners(sqlite3);

backnetLoop.run();
trendLoop.run();
// modbusLoop.setDataListeners(mongoDB);
modbusLoop.setDataListeners(socketIO);
modbusLoop.connect();
