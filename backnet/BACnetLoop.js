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
const sqlite3 = require('../SQLite3/SQLite');

buffer.setDataListeners(mongoDB);
buffer.setDataListeners(fireBase);
buffer.setDataListeners(socketIO);
buffer.setDataListeners(sqlite3);

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
        this.runAI();
        this.runAO();
        this.runAV();
        this.runBI();
        this.runBO();
        this.runBV();
    }

    runAV() {
        const stop = setInterval(() => {
            this.pointsAV.forEach((pointNumber) => {
                readAV(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    })
                    .catch((err) => {
                        //console.log('[ERROR] pointsAV', err);
                    });
            });
        }, pollingTime * 60);
    }
    runBV() {
        const stop = setInterval(() => {
            this.pointsBV.forEach((pointNumber) => {
                readBV(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    })
                    .catch((err) => {
                        //console.log('[ERROR] pointsBV', err);
                    });
            });
        }, pollingTime * 3);
    }
    runAI() {
        const stop = setInterval(() => {
            this.pointsAI.forEach((pointNumber) => {
                readAI(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    })
                    .catch((err) => {
                        //console.log('[ERROR] pointsAI', err);
                    });
            });

        }, pollingTime * 3);
    }
    runAO() {
        const stop = setInterval(() => {
            this.pointsAO.forEach((pointNumber) => {
                readAO(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    })
                    .catch((err) => {
                        //console.log('[ERROR] pointsAO', err);
                    });
            });
        }, pollingTime * 2);
    }
    runBI() {
        const stop = setInterval(() => {
            this.pointsBI.forEach((pointNumber) => {
                readBI(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    })
                    .catch((err) => {
                        //console.log('[ERROR] pointsBI', err);
                    });
            });
        }, pollingTime * 3);
    }
    runBO() {
        const stop = setInterval(() => {
            this.pointsBO.forEach((pointNumber) => {
                readBO(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    })
                    .catch((err) => {
                        //console.log('[ERROR] pointsBO', err);
                    });
            });
        }, pollingTime * 1);
    }
}

module.exports = new BACnetLoop(pointsAV, pointsBV, pointsAI, pointsAO, pointsBI, pointsBO);
