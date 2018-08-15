const AVsModel = require('./models/AV.js');
const BVsModel = require('./models/BV.js');
const trendModel = require('./models/trendItem');

class MongoDB {
    constructor() {
        this.AVsModel = AVsModel;
        this.BVsModel = BVsModel;
        this.trendModel = trendModel;
    }

    saveTrendData(av) {
        const element = {
            timeStamp: new Date().getTime(),
            title: av.title,
            value: av.value,
        };
        trendModel.create(element, (err, item) => {
            if (err) {
                console.log('MongoError', err);
                throw err;
            }
            console.log('\nSAVE Trend Point\n', item);
        });
    }

    getTrendData(point, startTime, endTime) {
        const query = { title: point, timeStamp: {$gte: startTime, $lte: endTime} };
        return new Promise((resolve, reject) => {
            this.trendModel.find(query).sort({ timeStamp: 'asc'}).exec(
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    if (res) {
                        const data = res.map((point) => {
                            return { x: point.timeStamp, y: point.value };
                        });
                        resolve(data);
                    }
                },
            );
        });
    }

    findOneAV(av) {
        return new Promise((resolve, reject) => {
            this.AVsModel.findOne(av,
                (err, avs) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(avs.value);
                },
            );
        });
    }

    findOneBV(bv) {
        return new Promise((resolve, reject) => {
            this.BVsModel.findOne(bv,
                (err, bvs) => {
                    if (err) {
                        reject(err);
                    }
                    if (bvs) {
                        resolve(bvs.value);
                    }
                }
            );
        });
    }

    updateAV(av) {
        const query = { title: av.title };
        const update = {
            '$set': {
                value: av.value,
            }
        };
        const options = {
            new: true,
        };
        this.AVsModel.findOneAndUpdate(query, update, options, (err,res) => {
            if (err) {
                throw err;
            }
            // console.log(` ${query.title} updated to value: ${av.value}`);
            // console.log(`Mongo response --> ${res}`);
        });
        if (av.trend) {
            this.saveTrendData(av);
        }
    }

    updateBV(bv) {
        const query = { title: bv.title };
        const update = {
            '$set': {
                value: bv.value,
            },
        };
        const options = {
            new: true,
        };
        this.BVsModel.findOneAndUpdate(query, update, options, (err,res) => {
            if (err) {
                throw err;
            }
            // console.log(` ${query.title} updated to value: ${bv.value}`);
        });
    }

    updateData(dataPoint) {
        if (dataPoint.title.search(/AV/i) !== -1
            || dataPoint.title.search(/AI/i) !== -1
            || dataPoint.title.search(/AO/i) !== -1) {
            this.updateAV(dataPoint);
        } else if (dataPoint.title.search(/BV/i) !== -1
            || dataPoint.title.search(/BI/i) !== -1
            || dataPoint.title.search(/BO/i) !== -1) {
            this.updateBV(dataPoint);
        }
    }
}

module.exports = new MongoDB(AVsModel, BVsModel);
