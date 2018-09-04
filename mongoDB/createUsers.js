const mongoose = require('mongoose');
const userModel = require('./models/user');

const {
    DATABASE_USER_NAME,
    DATABASE_USER_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
} = require('./config');

//const dataBaseLink = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
const dataBaseLink = `mongodb://${DATABASE_USER_NAME}:${DATABASE_USER_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

mongoose.connect(dataBaseLink)
    .then(() => {
        userModel.create({
            email: 'pan@mail.com', //TODO: delete in prod
            password: '1234', //TODO: delete in prod
        }, (err, user) => {
            if (err) {
                console.log('MongoError', err);
                throw err;
            }
            console.log('\nSAVE User\n', user);
        });
        userModel.create({
            email: 'vasya', //TODO: delete in prod
            password: '1111', //TODO: delete in prod
        }, (err, user) => {
            if (err) {
                console.log('MongoError', err);
                throw err;
            }
            console.log('\nSAVE User\n', user);
        });
        userModel.create({
            email: 'a.panibratenko@gmail.com', //TODO: delete in prod
            password: '4571', //TODO: delete in prod
        }, (err, user) => {
            if (err) {
                console.log('MongoError', err);
                throw err;
            }
            console.log('\nSAVE User\n', user);
        });
    }).catch((e) => {
        console.log('[ERROR] with connection to MongoDB: ', e);
    });

