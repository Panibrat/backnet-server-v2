const buffer = require('./dataBuffer');

const config = require('./config');
const pollingTime = config.pollingTime;
const pointsAV = config.pointsAV;
const pointsBV = config.pointsBV;

const readAV = require('./readData/readAVpromise');


class BACnetLoop {
    constructor(pointsAV, pointsBV) {
        this.pointsAV = pointsAV;
        this.pointsBV = pointsBV;
    }
    run() {
        const stop = setInterval(() => {
            this.pointsAV.forEach((pointNumber) => {
                readAV(pointNumber)
                    .then((point) => {
                        buffer.setData(point)
                    })
            });
            console.log(buffer.getData());

            //updateBuffer();
            //updateMongo();
            //updateFireBase();

        }, pollingTime)
    }
}

module.exports = new BACnetLoop(pointsAV, pointsBV);