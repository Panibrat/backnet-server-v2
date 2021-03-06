const BACnetClient = require('../BACnetClient');
const buffer = require('../dataBuffer');
const reqArr2 = [
    { objectIdentifier: { type: 0, instance: 3001122 }, propertyReferences: [ { propertyIdentifier: 85 } ] },
    { objectIdentifier: { type: 0, instance: 3000156 }, propertyReferences: [ { propertyIdentifier: 85 } ] },
];


const readMultyAI = (arr) => {
    BACnetClient.client.readPropertyMultiple(
        BACnetClient.ip, // IP device
        arr,
        (err, value) => {
            if (err) {
                console.log('error1----->\n', err);
            } else {
                if (value && value.values) {
                    value.values.forEach((item, i) => {
                        if (
                            value &&
                            value.values &&
                            value.values &&
                            value.values[i] &&
                            value.values[i].values &&
                            value.values[i].values[0] &&
                            value.values[i].values[0].value &&
                            value.values[i].values[0].value[0]
                        ) {
                            const resolveItem = {
                                title: `AI${value.values[i].objectIdentifier.instance}`,
                                value: +value.values[i].values[0].value[0].value.toFixed(1)
                            };
                            buffer.setData(resolveItem);
                        } else {
                            console.log(`[error readMultyAI] AI${value.values[i].objectIdentifier.instance}`);
                        }
                    })
                } else {
                    console.log('[readMultyAI] no data ');
                }
            }
        },
    );
};

module.exports = readMultyAI;
