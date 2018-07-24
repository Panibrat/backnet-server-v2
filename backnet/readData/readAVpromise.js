const BACnetClient = require('../BACnetClient');

const readAV = pointNumber => new Promise((resolve, reject) => {
    BACnetClient.client.readProperty(
        BACnetClient.ip, // IP device
        2, // 2 = Analog Value
        pointNumber, // AO number 0 means AI-1
        85, // propertyId???????????
        null,
        (err, value) => {
            try {
                const itemValue = +value.valueList[0].value.toFixed(1);
                resolve({
                    title: `AV${pointNumber}`,
                    value: itemValue,
                });
            } catch (error) {
                // console.log('AV ERRRRROR CATCH: ', error);
                const itemValue = (+Math.random() + 99).toFixed(1);// TODO: need for MOCK. Delete in prod :)
                resolve({
                    title: `AV${pointNumber}`,
                    value: itemValue,
                });
            }
            reject(err);
        },
    );
});

module.exports = readAV;
