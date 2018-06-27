const buffer = require('./dataBuffer');
const config = require('./config');
const readAV = require('./readData/readAVpromise');
const readBV = require('./readData/readBVpromise');

const getBVPointArrayFromJSON = require('../services/getBVPointArrayFromJSON');
const getAVPointArrayFromJSON = require('../services/getAVPointArrayFromJSON');

const pointsBV = getBVPointArrayFromJSON(require('./configBV_data'));
const pointsAV = getAVPointArrayFromJSON(require('./configAV_data'));

const { pollingTime } = config;

const mongoDB = require('../mongoDB/MongoDB');
const fireBase = require('../fireBaseDB/FireBaseDB');

buffer.setDataListeners(mongoDB);
buffer.setDataListeners(fireBase);

class BACnetLoop {
    constructor(avArray, bvArray) {
        this.pointsAV = avArray;
        this.pointsBV = bvArray;
    }

    run() {
        const stop = setInterval(() => {
            this.pointsAV.forEach((pointNumber) => {
                readAV(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    });
            });
            this.pointsBV.forEach((pointNumber) => {
                readBV(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    });
            });
        }, pollingTime);
    }
}

module.exports = new BACnetLoop(pointsAV, pointsBV);
