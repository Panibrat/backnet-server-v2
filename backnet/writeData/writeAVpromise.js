const bacnet = require('bacstack');
const BACnetClient = require('../BACnetClient');

const writeAV = (av) => {
    return new Promise((resolve, reject) => {
        const pointNumber = +(av.title.substring(2));
        const valueToSave = av.value;
        BACnetClient.client.writeProperty(
            BACnetClient.ip, // IP device
            2, // 2 = Analog Value
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
                    console.log('[ERROR] [BACnet] writePropertyError: ', err);
                    reject(err);
                } else {
                    console.log('writeProperty: ', value);
                    console.log('av: ', av);
                    resolve(av);
                }
            },
        );
    });
};
module.exports = writeAV;
