const mongoose = require('mongoose');
const AVsModel = require('./models/AV.js');
const BVsModel = require('./models/BV.js');
const pointsBV = require('../backnet/configBV_data');
const pointsAV = require('../backnet/configAV_data');

const { DATABASE_HOST,
        DATABASE_PORT,
        DATABASE_NAME
} = require('./config');

const dataBaseLink = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

mongoose.connect(dataBaseLink);

pointsAV.forEach(element => {
    AVsModel.create(element, function(err, av) {
        if (err) {
            console.log('MongoError', err);
            throw err;
        }
        console.log('\nSAVE AV\n', av);
    });    
});

pointsBV.forEach(element => {
    BVsModel.create(element, function(err, bv) {
        if (err) {
            console.log('MongoError', err);
            throw err;
        }
        console.log('\nSAVE BV\n', bv);
    });    
});
