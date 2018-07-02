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
const getStateFromBuffer = require('./services/getStateFromBuffer');

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
} = require('./mongoDB/config');

const dataBaseLink = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

mongoose.connect(dataBaseLink);

const app = express();

const port = process.env.PORT || '3000';

app.use(express.static('public'));

app.get('/buffer', (req, res) => {
    const bufferData = buffer.getData();
    const stateData = getStateFromBuffer(
        bufferData,
        configAVs,
        configBVs,
        configAIs,
        configAOs,
        configBIs,
        configBOs);
    res.send(JSON.stringify(stateData));
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, (req, res) => {
    console.log(`Server run on port ${port}!`);
});

backnetLoop.run();
