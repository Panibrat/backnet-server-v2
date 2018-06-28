const BACnetClient = require('../BACnetClient');

const readBI = pointNumber => new Promise((resolve, reject) => {
    BACnetClient.client.readProperty(
        BACnetClient.ip, // IP device
        3, // 5 = Binary Input
        pointNumber, // AO number 0 means AI-1
        85, // propertyId???????????
        null,
        (err, value) => {
            try {
                const itemValue = value.valueList[0].value;
                resolve({
                    title: `BI${pointNumber}`,
                    value: itemValue,
                });
            } catch (error) {
                console.log('BI ERRRRROR CATCH: ', error);
                itemValue = Math.random() >= 0.5;
                // itemValue = undefined;
                resolve({
                    title: `BI${pointNumber}`,
                    value: itemValue,
                });
            }
            reject(err);
        },
    );
});

module.exports = readBI;
