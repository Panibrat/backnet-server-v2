const mongoose = require('mongoose');
const trendModel = require('./models/trendItem');

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
} = require('./config');

const dataBaseLink = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

const element = {
    timeStamp: new Date().getTime(),
    title: 'AI3000308',
    name: 'iT_FOR',
    units: '℃',
    value: (+Math.random() * 20 + 10).toFixed(1),
};

function createElement(title, name) {
    return {
        timeStamp: new Date().getTime() - (+Math.random() * 50000000).toFixed(0),
        title: title,
        name: name,
        units: '℃',
        value: (+Math.random() * 20 + 10).toFixed(1),
    }
}


mongoose.connect(dataBaseLink).then(() => {
    for (let i = 0; i < 100; i++) {
        trendModel.create(createElement('AI3000308', 'iT_FOR'), (err, item) => {
            if (err) {
                console.log('MongoError', err);
                throw err;
            }
            console.log('\nSAVE Trend Point\n', item);
        });
        trendModel.create(createElement('AI3000307', 'Т OUT'), (err, item) => {
            if (err) {
                console.log('MongoError', err);
                throw err;
            }
            console.log('\nSAVE Trend Point\n', item);
        });
    }
});
