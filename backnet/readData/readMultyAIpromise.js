const BACnetClient = require('../BACnetClient');

const readMultyAI = () => {
    console.log('IP', BACnetClient.ip);
    BACnetClient.client.readPropertyMultiple(
        BACnetClient.ip, // IP device
        [
            { objectId: { type: 0, instance: 3001122 }, properties: [{ id: 8 }] },
            { objectId: { type: 0, instance: 3000156 }, properties: [{ id: 8 }] },
        ],
        (err, value) => {
            if (err) {
                console.log('error1----->\n', err);
            } else {
                console.log('value1----->\n', value);
            }
        },
    );
};

/*const readMultyAI = objectsToRead => new Promise((resolve, reject) => {
    BACnetClient.client.readPropertyMultiple(
        BACnetClient.ip, // IP device
        objectsToRead, // requestArray
        (err, value) => {
            if (err) {
                console.log('error1----->\n', error);
                reject(err);
            }
            try {
                console.log('value1----->\n', value);
                resolve(value);
            } catch (error) {
                console.log('error2----->\n', error);
                reject(error);
            }
        },
    );
});*/

module.exports = readMultyAI;
