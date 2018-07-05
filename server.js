const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

module.exports.io = io;

const backnetLoop = require('./backnet/BACnetLoop');
const buffer = require('./backnet/dataBuffer');

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

const port = process.env.PORT || '3000';

app.use(express.static('public'));

app.get('/buffer', (req, res) => {
    const bufferData = buffer.getData();
    res.send(JSON.stringify(bufferData));
});

app.get('/ai', (req, res) => {
    res.send(JSON.stringify(buffer.getAnalogInputsData()));
});

app.get('/ao', (req, res) => {
    res.send(JSON.stringify(buffer.getAnalogOutputsData()));
});

app.get('/bi', (req, res) => {
    res.send(JSON.stringify(buffer.getBinaryInputsData()));
});

app.get('/bo', (req, res) => {
    res.send(JSON.stringify(buffer.getBinaryOutputsData()));
});

app.get('/av', (req, res) => {
    res.send(JSON.stringify(buffer.getAnalogValueData()));
});

app.get('/bv', (req, res) => {
    res.send(JSON.stringify(buffer.getBinaryValueData()));
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

server.listen(port, (req, res) => {
    console.log(`Server run on port ${port}!`);
});


io.on('connection', (socket) => {

    console.log('a user connected', socket.id);
    socket.on('test 1', (state) => {
        console.log('test 1 GOT');
        console.log('state', state);
    });

    socket.on('update analogs', (point) => {
        console.log('update analogs', point);
    });

    socket.on('update binary', (point) => {
        console.log('update binary', point);
    });

    socket.on('disconnect', function () {
        io.emit('user disconnected', socket.id);
    });


});

backnetLoop.run();
