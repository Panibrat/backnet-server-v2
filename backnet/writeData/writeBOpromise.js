const bacnet = require('bacstack');
const BACnetClient = require('../BACnetClient');

const writeBO = (bo) => {
    const startTime = new Date();
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
                    console.log('[ERROR] [BACnet] writePropertyError: ', err);
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
