const buffer = require('./dataBuffer');
const config = require('./config');
const readAV = require('./readData/readAVpromise');
const readBV = require('./readData/readBVpromise');
const readAI = require('./readData/readAIpromise');
const readAO = require('./readData/readAOpromise');
const readBI = require('./readData/readBIpromise');
const readBO = require('./readData/readBOpromise');

const getPointsArrayFromJSON = require('../services/getPointsArrayFromJSON');

const pointsBV = getPointsArrayFromJSON(require('./configBV_data'), 'BV');
const pointsAV = getPointsArrayFromJSON(require('./configAV_data'), 'AV');
const pointsAI = getPointsArrayFromJSON(require('./configAI_data'), 'AI');
const pointsAO = getPointsArrayFromJSON(require('./configAO_data'), 'AO');
const pointsBI = getPointsArrayFromJSON(require('./configBI_data'), 'BI');
const pointsBO = getPointsArrayFromJSON(require('./configBO_data'), 'BO');

const { pollingTime } = config;

const mongoDB = require('../mongoDB/MongoDB');
const fireBase = require('../fireBaseDB/FireBaseDB');
const socketIO = require('../socketIO/SocketIO');

buffer.setDataListeners(mongoDB);
buffer.setDataListeners(fireBase);
buffer.setDataListeners(socketIO);

class BACnetLoop {
    constructor(avArray, bvArray, aiArray, aoArray, biArray, boArray) {
        this.pointsAV = avArray;
        this.pointsBV = bvArray;
        this.pointsAI = aiArray;
        this.pointsAO = aoArray;
        this.pointsBI = biArray;
        this.pointsBO = boArray;
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
            this.pointsAI.forEach((pointNumber) => {
                readAI(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    });
            });
            this.pointsAO.forEach((pointNumber) => {
                readAO(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    });
            });
            this.pointsBI.forEach((pointNumber) => {
                readBI(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    });
            });
            this.pointsBO.forEach((pointNumber) => {
                readBO(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    });
            });
        }, pollingTime);
    }
}

module.exports = new BACnetLoop(pointsAV, pointsBV, pointsAI, pointsAO, pointsBI, pointsBO);
