const buffer = require('./dataBuffer');
const config = require('./config');
const readAV = require('./readData/readAVpromise');
const readBV = require('./readData/readBVpromise');
const readAI = require('./readData/readAIpromise');
const readAO = require('./readData/readAOpromise');
const readBI = require('./readData/readBIpromise');
const readBO = require('./readData/readBOpromise');

const getBVPointArrayFromJSON = require('../services/getBVPointArrayFromJSON');
const getAVPointArrayFromJSON = require('../services/getAVPointArrayFromJSON');
const getAIPointArrayFromJSON = require('../services/getAIPointArrayFromJSON');
const getAOPointArrayFromJSON = require('../services/getAOPointArrayFromJSON');
const getBIPointArrayFromJSON = require('../services/getBIPointArrayFromJSON');
const getBOPointArrayFromJSON = require('../services/getBOPointArrayFromJSON');

const pointsBV = getBVPointArrayFromJSON(require('./configBV_data'));
const pointsAV = getAVPointArrayFromJSON(require('./configAV_data'));
const pointsAI = getAIPointArrayFromJSON(require('./configAI_data'));
const pointsAO = getAOPointArrayFromJSON(require('./configAO_data'));
const pointsBI = getBIPointArrayFromJSON(require('./configBI_data'));
const pointsBO = getBOPointArrayFromJSON(require('./configBO_data'));

const { pollingTime } = config;

const mongoDB = require('../mongoDB/MongoDB');
const fireBase = require('../fireBaseDB/FireBaseDB');

buffer.setDataListeners(mongoDB);
buffer.setDataListeners(fireBase);

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
