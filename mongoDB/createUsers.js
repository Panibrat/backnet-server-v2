const mongoose = require('mongoose');
const userModel = require('./models/user');

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
} = require('./config');

const dataBaseLink = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

mongoose.connect(dataBaseLink).then(() => {
    userModel.create({
        email: 'pan@mail.com',
        password: '1234',
    }, (err, user) => {
        if (err) {
            console.log('MongoError', err);
            throw err;
        }
        console.log('\nSAVE User\n', user);
    });
    userModel.create({
        email: 'vasya',
        password: '1111',
    }, (err, user) => {
        if (err) {
            console.log('MongoError', err);
            throw err;
        }
        console.log('\nSAVE User\n', user);
    });
    userModel.create({
        email: 'a.panibratenko@gmail.com',
        password: '4571',
    }, (err, user) => {
        if (err) {
            console.log('MongoError', err);
            throw err;
        }
        console.log('\nSAVE User\n', user);
    });
});
