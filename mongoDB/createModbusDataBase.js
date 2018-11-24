const mongoose = require('mongoose');
const modbusModel = require('./models/modbusModel');
const modbusTable = require('../modbus/modbusRegisterTable.json');

const {
    DATABASE_USER_NAME,
    DATABASE_USER_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
} = require('./config');

const dataBaseLink = `mongodb://${DATABASE_USER_NAME}:${DATABASE_USER_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

mongoose.connect(dataBaseLink, {
    useCreateIndex: true,
    useNewUrlParser: true
})
    .then(() => {
        modbusTable.forEach((element) => {
            modbusModel.create(element, (err, av) => {
                if (err) {
                    console.log('MongoError', err);
                    throw err;
                }
                console.log('\nSAVE Modbus Model\n', av);
            });
        });
    })
    .catch((e) => {
        console.log('[ERROR] with connection to MongoDB: ', e);
    });

