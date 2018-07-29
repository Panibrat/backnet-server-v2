const bacnet = require('bacstack');
const BACnetClient = require('../BACnetClient');

const mongoDB = require('../../mongoDB/MongoDB');

const writeBO = (bo) => {
    return new Promise((resolve, reject) => {
        const pointNumber = +(bo.title.substring(2));
        const valueToSave = bo.value ? 1 : 0;
        BACnetClient.client.writeProperty(
            BACnetClient.ip, // IP device
            4,  //4 = Binary Output
            pointNumber, // AV number 10s
            85, // propertyId???????????
            16, // priority 16
            [
                {
                    type: bacnet.enum.BacnetApplicationTags.BACNET_APPLICATION_TAG_ENUMERATED,
                    value: valueToSave,
                },
            ], // value to write!!!!
            (err, value) => { // NOTE: type changed to correct value
                if (err) {
                    console.log('writePropertyError: ', err);
                    mongoDB.updateBV(bo);
                    reject(err);
                } else {
                    console.log('writeProperty: ', value);
                    resolve(bo);
                }
            },
        );
    });
};
module.exports = writeBO;
