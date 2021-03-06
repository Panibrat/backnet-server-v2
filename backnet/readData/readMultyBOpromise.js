const BACnetClient = require('../BACnetClient');
const buffer = require('../dataBuffer');

const readMultyBO = (arr) => {
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
                                title: `BO${value.values[i].objectIdentifier.instance}`,
                                value: value.values[i].values[0].value[0].value
                            };
                            buffer.setData(resolveItem);
                        } else {
                            console.log(`[error readMultyBO] BO${value.values[i].objectIdentifier.instance}`);
                        }
                    })
                } else {
                    console.log('[readMultyBO] no data ');
                }
            }
        },
    );
};

module.exports = readMultyBO;
