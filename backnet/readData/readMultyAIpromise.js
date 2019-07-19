const BACnetClient = require('../BACnetClient');
const reqArr2 = [
    { objectIdentifier: { type: 0, instance: 3001122 }, propertyReferences: [ { propertyIdentifier: 85 } ] },
    { objectIdentifier: { type: 0, instance: 3000156 }, propertyReferences: [ { propertyIdentifier: 85 } ] },
];


const readMultyAI = () => {
    console.log('IP', BACnetClient.ip);
    BACnetClient.client.readPropertyMultiple(
        BACnetClient.ip, // IP device
        reqArr2,
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
