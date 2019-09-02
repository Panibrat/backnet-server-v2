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

class BACnetLoop {
    constructor(avArray, bvArray, aiArray, aoArray, biArray, boArray) {
        this.pointsAV = avArray;
        this.pointsBV = bvArray;
        this.pointsAI = aiArray;
        this.pointsAO = aoArray;
        this.pointsBI = biArray;
        this.pointsBO = boArray;
        this.users = {};
        this.fastPollingPoints = {};
    }

    run() {
        // SLOW LOOP
        this.runPointsByArray(this.pointsAI, readAI, 30);
        this.runPointsByArray(this.pointsAO, readAO, 30);
        this.runPointsByArray(this.pointsBO, readBO, 30);
        this.runPointsByArray(this.pointsBI, readBI, 30);
        this.runPointsByArray(this.pointsAV, readAV, 60);
        // FAST LOOP`
        this.runPointsByType('ai', readAI, 2);
        this.runPointsByType('ao', readAO, 2);
        this.runPointsByType('bo', readBO, 2);
        this.runPointsByType('bi', readBI, 2);
        this.runPointsByType('av', readAV, 30);
    }

    updateFastPollingPoints(){
        this.fastPollingPoints = {
            ai: new Set(),
            ao: new Set(),
            bo: new Set(),
            bi: new Set(),
            bv: new Set(),
        };
        Object.keys(this.users).forEach((user) => {
            Object.keys(this.users[user]).forEach(typeOfPoint => {
                this.users[user][typeOfPoint].forEach(pointAddress => {
                    this.fastPollingPoints[typeOfPoint].add(pointAddress);
                });
            })
        });
    }

    setUserWithPoints(objectOfPoints, user) {
        this.users[user.socketId] = objectOfPoints;
        this.updateFastPollingPoints();
    }

    handleUserDisconnected(socketId) {
        delete this.users[socketId];
        this.updateFastPollingPoints();
    }

    runPointsByArray(array, readFunction, timeScale) {
        setInterval(() => {
            array.forEach((pointNumber) => {
                readFunction(pointNumber)
                    .then((point) => {
                        buffer.setData(point);
                    })
                    .catch((err) => {
                        console.log(`[ERROR READ] ${pointNumber}`, err);
                    });
            });
        }, pollingTime * timeScale);
    }

    runPointsByType(pointType, readFunction, timeScale) {
        setInterval(() => {
            if (this.fastPollingPoints[pointType]) {
                this.fastPollingPoints[pointType].forEach((pointNumber) => {
                    readFunction(pointNumber)
                        .then((point) => {
                            buffer.setData(point);
                        })
                        .catch((err) => {
                            console.log(`[ERROR READ] ${pointType.toUpperCase()}${pointNumber}`, err);
                        });
                });
            }
        }, pollingTime * timeScale);
    }
}

module.exports = new BACnetLoop(pointsAV, pointsBV, pointsAI, pointsAO, pointsBI, pointsBO);
