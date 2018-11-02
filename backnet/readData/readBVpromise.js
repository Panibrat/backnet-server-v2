const BACnetClient = require('../BACnetClient');

const readBV = pointNumber => new Promise((resolve, reject) => {
    BACnetClient.client.readProperty(
        BACnetClient.ip, // IP device
        5, // 5 = Binary Value
        pointNumber, // AO number 0 means AI-1
        85, // propertyId???????????
        null,
        (err, value) => {
            if (err) {
                reject(err);
            }
            try {
                const itemValue = value.valueList[0].value;
                resolve({
                    title: `BV${pointNumber}`,
                    value: itemValue,
                });
            } catch (error) {
                reject(error);
            }
        },
    );
});

module.exports = readBV;
