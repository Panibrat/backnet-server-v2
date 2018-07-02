const BACnetClient = require('../BACnetClient');

const readAI = pointNumber => new Promise((resolve, reject) => {
    BACnetClient.client.readProperty(
        BACnetClient.ip, // IP device
        0, // 2 = Analog Value
        pointNumber, // AO number 0 means AI-1
        85, // propertyId???????????
        null,
        (err, value) => {
            try {
                const itemValue = +value.valueList[0].value.toFixed(1);
                resolve({
                    title: `AI${pointNumber}`,
                    value: itemValue,
                });
            } catch (error) {
                // console.log('AI ERRRRROR CATCH: ', error);
                const itemValue = +Math.random().toFixed(2) + 99;// TODO: need for MOCK. Delete in prod :)
                resolve({
                    title: `AI${pointNumber}`,
                    value: itemValue,
                });
            }
            reject(err);
        },
    );
});

module.exports = readAI;
