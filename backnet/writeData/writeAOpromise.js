const bacnet = require('bacstack');
const BACnetClient = require('../BACnetClient');

const writeAO = (ao) => {
    return new Promise((resolve, reject) => {
        const pointNumber = +(ao.title.substring(2));
        const valueToSave = ao.value;
        BACnetClient.client.writeProperty(
            BACnetClient.ip, // IP device
            1, // 1 = Analog Output
            pointNumber, // AV number 10
            85, // propertyId???????????
            16, // priority 16
            [
                {
                    // type: bacnet.enum.BacnetApplicationTags.BACNET_APPLICATION_TAG_ENUMERATED,
                    type: bacnet.enum.BacnetApplicationTags.BACNET_APPLICATION_TAG_REAL,
                    value: valueToSave,
                },
            ], // value to write!!!!
            (err, value) => { // NOTE: type changed to correct value
                if (err) {
                    console.log('writePropertyError: ', err);
                    reject(err);
                } else {
                    console.log('writeProperty: ', value);
                    resolve(ao);
                }
            },
        );
    });
};
module.exports = writeAO;
