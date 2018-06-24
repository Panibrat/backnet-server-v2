//BACnet
const bacnet = require('bacstack');
// Initialize BACStack
const client = new bacnet();

const config = require('./config');
const IP = config.IP;

class BACnetClient {
    constructor(ip, clientInstance) {
        this.ip = ip;
        this.client = clientInstance;
    }
}

module.exports = new BACnetClient(IP, client);