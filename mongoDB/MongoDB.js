const AVsModel = require('./models/AV.js');
const BVsModel = require('./models/BV.js');
const trendModel = require('./models/trendItem');
const userModel = require('./models/user');
const modbusModel = require('./models/modbusModel');

const modbusTypes = ["IntBE", 'FloatBE'];

class MongoDB {
    constructor() {
        this.AVsModel = AVsModel;
        this.BVsModel = BVsModel;
        this.trendModel = trendModel;
        this.userModel = userModel;
        this.modbusModel = modbusModel;
    }

    saveTrendData(av) {
        if (av.value > -50) {
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
                //console.log('\nSAVE Trend Point\n', item);
            });
        }
    }

    getTrendData(point, startTime, endTime) {
        const query = { title: point, timeStamp: { $gte: startTime, $lte: endTime } };
        return new Promise((resolve, reject) => {
            this.trendModel.find(query).sort({ timeStamp: 'asc' }).exec(
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    if (res) {
                        const data = res.map((savedPoint) => {
                            return { x: savedPoint.timeStamp, y: savedPoint.value };
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

    updateModbusPoint(point) {
        const query = { title: point.title };
        const update = {
            '$set': {
                value: point.value,
            }
        };
        const options = {
            new: true,
        };
        this.modbusModel.findOneAndUpdate(query, update, options, (err,res) => {
            if (err) {
                throw err;
            }
            // console.log(` ${query.title} updated to value: ${av.value}`);
            // console.log(`Mongo response --> ${res}`);
        });
        if (point.trend) {
            this.saveTrendData(point);
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
        } else if (dataPoint.type && modbusTypes.indexOf(dataPoint.type) > -1) {
            this.updateModbusPoint(dataPoint);
        }
    }
}

module.exports = new MongoDB();
