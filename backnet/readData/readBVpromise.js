const BACnetClient = require('../BACnetClient');

const mongoDB = require('../../mongoDB/MongoDB');

const readBV = pointNumber => new Promise((resolve, reject) => {
    BACnetClient.client.readProperty(
        BACnetClient.ip, // IP device
        5, // 5 = Binary Value
        pointNumber, // AO number 0 means AI-1
        85, // propertyId???????????
        null,
        (err, value) => {
            try {
                const itemValue = value.valueList[0].value;
                //console.log('value', value);
                resolve({
                    title: `BV${pointNumber}`,
                    value: itemValue,
                });
            } catch (error) {
                mongoDB.findOneBV({ title: `BV${pointNumber}` }).then((itemValue) => {
                    //console.log('itemValue', itemValue);
                    resolve({
                        title: `BV${pointNumber}`,
                        value: itemValue,
                    });
                });
                // console.log('BV ERRRRROR CATCH: ', error);
                //const itemValue = Math.random() >= 0.5;
                // itemValue = undefined;
                /*resolve({
                    title: `BV${pointNumber}`,
                    value: itemValue,
                });*/
            }
            //reject(err);
        },
    );
});

module.exports = readBV;
