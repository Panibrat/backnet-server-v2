const BACnetClient = require('../BACnetClient');

const readMultyAI = objectsToRead => new Promise((resolve, reject) => {
    BACnetClient.client.readPropertyMultiple(
        BACnetClient.ip, // IP device
        objectsToRead, // requestArray
        (err, value) => {
            if (err) {
                reject(err);
            }
            try {
                resolve({ value });
            } catch (error) {
                reject(error);
            }
        },
    );
});

module.exports = readMultyAI;
