const mongoose = require('mongoose');
const trendModel = require('./models/trendItem');

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
} = require('./config');

const dataBaseLink = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;


function createElement(title, name) {
    return {
        timeStamp: new Date().getTime() - (+Math.random() * 500000000).toFixed(0),
        title: title,
        name: name,
        units: '℃',
        value: (+Math.random() * 20 + 10).toFixed(1),
    }
}


mongoose.connect(dataBaseLink, { useNewUrlParser: true }).then(() => {
    for (let i = 0; i < 100; i++) {
        trendModel.create(createElement('AI3000308', 'iT_FOR'), (err, item) => {
            if (err) {
                console.log('MongoError', err);
                throw err;
            }
            //console.log('\nSAVE Trend Point\n', item);
        });
        trendModel.create(createElement('AI3000307', 'Т OUT'), (err, item) => {
            if (err) {
                console.log('MongoError', err);
                throw err;
            }
            //console.log('\nSAVE Trend Point\n', item);
        });
    }
});
