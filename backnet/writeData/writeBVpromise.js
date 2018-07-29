const bacnet = require('bacstack');
const BACnetClient = require('../BACnetClient');

const writeBV = (bv) => {
    return new Promise((resolve, reject) => {
        const pointNumber = +(bv.title.substring(2));
        const valueToSave = bv.value ? 1: 0;
        BACnetClient.client.writeProperty(
            BACnetClient.ip, // IP device
            5,  //5 = Binary Value
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
                    console.log('valueToSave', valueToSave);
                    reject(err);
                } else {
                    console.log('writeProperty: ', value);
                    resolve(bv);
                }
            },
        );
    });
};
module.exports = writeBV;
