const BACnetClient = require('../BACnetClient');
const reqArr2 = [
    { objectIdentifier: { type: 0, instance: 3001122 }, propertyReferences: [ { propertyIdentifier: 85 } ] },
    { objectIdentifier: { type: 0, instance: 3000156 }, propertyReferences: [ { propertyIdentifier: 85 } ] },
];


const readMultyAI = (arr) => {
    console.log('IP', BACnetClient.ip);
    BACnetClient.client.readPropertyMultiple(
        BACnetClient.ip, // IP device
        arr,
        (err, value) => {
            if (err) {
                console.log('error1----->\n', err);
            } else {
                // console.log('value----->\n', value);
/*
                console.log('value.values----->\n', value.values);
                console.log('value.values[0]----->\n', value.values[0]);
                console.log('value.values[0].objectIdentifier----->\n', value.values[0].objectIdentifier);
                console.log('value.values[0].values[0]----->\n', value.values[0].values[0]);
*/
                //console.log('value.values[1].values[0]----->\n', value.values[1].values[0]);
                if (value && value.values) {
                    value.values.forEach((item, i) => {
/*
                        console.log( 'objectIdentifier', value.values[i].objectIdentifier.instance);
                        console.log( i + ' -----> \n', value.values[i].values[0].value[0].value);
*/
                        const resolveItem = {
                            title: `AI${value.values[i].objectIdentifier.instance}`,
                            value: value.values[i].values && value.values[i].values[0].value && value.values[i].values[0].value[0].value
                                ?
                                value.values[i].values[0].value[0].value
                                :
                                9999,
                        };
                        console.log('resolveItem', resolveItem);
                    })
                } else {
                    console.log('[readMultyAI] no data ');
                }
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
