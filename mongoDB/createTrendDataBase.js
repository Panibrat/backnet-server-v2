const mongoose = require('mongoose');
const trendModel = require('./models/trendItem');

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_TREND_NAME,
} = require('./config');

const dataBaseLink = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_TREND_NAME}`;

const element = {
    timeStamp: new Date().getTime(),
    title: 'AI3000308',
    name: 'iT_FOR',
    units: '℃',
    value: (+Math.random() * 10 + 20).toFixed(1),
};


mongoose.connect(dataBaseLink).then(() => {
    trendModel.create(element, (err, item) => {
        if (err) {
            console.log('MongoError', err);
            throw err;
        }
        console.log('\nSAVE Trend Point\n', item);
    });
});
