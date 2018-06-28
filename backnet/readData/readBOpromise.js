const BACnetClient = require('../BACnetClient');

const readBO = pointNumber => new Promise((resolve, reject) => {
    BACnetClient.client.readProperty(
        BACnetClient.ip, // IP device
        4, // 5 = Binary Output
        pointNumber, // AO number 0 means AI-1
        85, // propertyId???????????
        null,
        (err, value) => {
            try {
                const itemValue = value.valueList[0].value;
                resolve({
                    title: `BO${pointNumber}`,
                    value: itemValue,
                });
            } catch (error) {
                console.log('BO ERRRRROR CATCH: ', error);
                itemValue = Math.random() >= 0.5;
                // itemValue = undefined;
                resolve({
                    title: `BO${pointNumber}`,
                    value: itemValue,
                });
            }
            reject(err);
        },
    );
});

module.exports = readBO;
