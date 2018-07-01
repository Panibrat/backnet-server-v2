const BACnetClient = require('../BACnetClient');

const readAO = pointNumber => new Promise((resolve, reject) => {
    BACnetClient.client.readProperty(
        BACnetClient.ip, // IP device
        1, // 2 = Analog Output
        pointNumber, // AO number 0 means AI-1
        85, // propertyId???????????
        null,
        (err, value) => {
            try {
                const itemValue = +value.valueList[0].value.toFixed(1);
                resolve({
                    title: `AO${pointNumber}`,
                    value: itemValue,
                });
            } catch (error) {
                console.log('AO ERRRRROR CATCH: ', error);
                const itemValue = +Math.random().toFixed(2) + 99;// TODO: need for MOCK. Delete in prod :)
                resolve({
                    title: `AO${pointNumber}`,
                    value: itemValue,
                });
            }
            reject(err);
        },
    );
});

module.exports = readAO;
