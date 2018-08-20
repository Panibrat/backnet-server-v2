const BACnetClient = require('../BACnetClient');

const mongoDB = require('../../mongoDB/MongoDB');

const readAV = pointNumber => new Promise((resolve, reject) => {
    BACnetClient.client.readProperty(
        BACnetClient.ip, // IP device
        2, // 2 = Analog Value
        pointNumber, // AO number 0 means AI-1
        85, // propertyId???????????
        null,
        (err, value) => {
/*            const now = new Date().getTime();
            const day = 1000 * 60 * 60 * 24;
            const hour = 1000 * 60 * 60;

            mongoDB.getTrendData('AI3000308', (now - 12*hour), now)
                .then(console.log);*/

            try {
                const itemValue = +value.valueList[0].value;
                resolve({
                    title: `AV${pointNumber}`,
                    value: itemValue,
                });
            } catch (error) {
                mongoDB.findOneAV({ title: `AV${pointNumber}` }).then((itemValue) => {
                    resolve({
                        title: `AV${pointNumber}`,
                        value: itemValue,
                    });
                });
                // console.log('AV ERRRRROR CATCH: ', error);
                const itemValue = new Date().getTime() + Math.random() * 100000000;// TODO: need for MOCK. Delete in prod :)
                resolve({
                    title: `AV${pointNumber}`,
                    value: itemValue,
                });
            }
            //reject(err);
        },
    );
});

module.exports = readAV;
