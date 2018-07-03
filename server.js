const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
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

const server = express();

const port = process.env.PORT || '3000';

server.use(express.static('public'));

server.get('/buffer', (req, res) => {
    const bufferData = buffer.getData();
    res.send(JSON.stringify(bufferData));
});

server.get('/ai', (req, res) => {
    res.send(JSON.stringify(buffer.getAnalogInputsData()));
});

server.get('/ao', (req, res) => {
    res.send(JSON.stringify(buffer.getAnalogOutputsData()));
});

server.get('/bi', (req, res) => {
    res.send(JSON.stringify(buffer.getBinaryInputsData()));
});

server.get('/bo', (req, res) => {
    res.send(JSON.stringify(buffer.getBinaryOutputsData()));
});

server.get('/av', (req, res) => {
    res.send(JSON.stringify(buffer.getAnalogValueData()));
});

server.get('/bv', (req, res) => {
    res.send(JSON.stringify(buffer.getBinaryValueData()));
});

server.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

server.listen(port, (req, res) => {
    console.log(`Server run on port ${port}!`);
});

backnetLoop.run();
