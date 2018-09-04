const mongoose = require('mongoose');
const AnalogModel = require('./models/AV.js');
const BinaryModel = require('./models/BV.js');
const pointsBV = require('../backnet/configBV_data');
const pointsBI = require('../backnet/configBI_data');
const pointsBO = require('../backnet/configBO_data');
const pointsAV = require('../backnet/configAV_data');
const pointsAI = require('../backnet/configAI_data');
const pointsAO = require('../backnet/configAO_data');

const analogPoints = [...pointsAV, pointsAI, ...pointsAO];
const binaryPoints = [...pointsBV, pointsBI, ...pointsBO];

const {
    DATABASE_USER_NAME,
    DATABASE_USER_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
} = require('./config');

const dataBaseLink = `mongodb://${DATABASE_USER_NAME}:${DATABASE_USER_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

mongoose.connect(dataBaseLink).then(() => {
    analogPoints.forEach((element) => {
        AnalogModel.create(element, (err, av) => {
            if (err) {
                console.log('MongoError', err);
                throw err;
            }
            console.log('\nSAVE Analog Point\n', av);
        });
    });
    binaryPoints.forEach(element => {
        BinaryModel.create(element, (err, bv) => {
            if (err) {
                console.log('MongoError', err);
                throw err;
            }
            console.log('\nSAVE Binary Point\n', bv);
        });
    });
});
