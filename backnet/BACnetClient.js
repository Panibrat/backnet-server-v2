// BACnet
const Bacnet = require('bacstack');
// Initialize BACStack
const client = new Bacnet();

const config = require('./config');

const { IP } = config;

class BACnetClient {
    constructor(ip, clientInstance) {
        this.ip = ip;
        this.client = clientInstance;
    }
}

module.exports = new BACnetClient(IP, client);
