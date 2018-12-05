const trendModel = require('./models/trendItem');


function printTrendData(point) {
    const query = { };

    trendModel.find(query, (err, res) => {
        if (err) {
            throw err;
        }
        console.log(`Mongo response --> ${res}`);
    });
}

printTrendData({title: 'AI3001122'});