const ModbusRTU = require("modbus-serial");
const modbusClient = new ModbusRTU();

const MODBUS_IP = '192.168.1.155';
const MODBUS_ID = 2;
const MODBUS_PORT = 502;
const POLING_TIME = 1000;
const RECONNECT_TIME = 5000;

/*modbusClient
    .connectTelnet(MODBUS_IP, { port: MODBUS_PORT })
    .then(() => {
        modbusClient.setID(MODBUS_ID)
    })
    .then(() => {
        console.log('loop read Promise All');
        run();
    })
    .catch((e) => {
        console.log('[MODBUS_ERROR: ]', e);
        modbusClient.close();
        console.log('wait and run again');
        setTimeout(() => {
            run();
        }, RECONNECT_TIME);
    });*/

function run() {
    const stop = setInterval(() => {
        console.log('read');
    }, POLING_TIME)
}

class ModbusLoop {
    constructor(client, ip, port, id) {
        this.buffer = [];
        this.client = client;
        this.ip = ip;
        this.port = port;
        this.id = id;
        this.stop = null;
        this.connect = this.connect.bind(this);
    }

    connect() {
        console.log("Connecting Modbus.....");
        this.client.connectTelnet(this.ip, { port: this.port })
            .then(() => {
                this.client.setID(this.id);
            })
            .then(() => {
                console.log('loop read Promise All');
                this.runLoop();
            })
            .catch((e) => {
                console.log('[MODBUS_ERROR: ]', e);
                this.client.close();
                clearInterval(this.stop);
                setTimeout(this.connect, RECONNECT_TIME);
        });
    }

    getIntBE8Bytes(registerAddress) {
        return this.client.readHoldingRegisters(registerAddress, 8)
            .then( (data) => {
                return data.buffer.readIntBE(2, 6);
            });
    }

    getFloatBE(registerAddress) {
        return this.client.readHoldingRegisters(registerAddress, 2)
            .then( (data) => {
                return data.buffer.readFloatBE();
            });
    }

    runLoop() {
        this.stop = setInterval(() => {
            this.getIntBE8Bytes(3203).then((value) => console.log('EnergyTotal', value));
            this.getIntBE8Bytes(4195).then((value) => console.log('EnergyDayTotal', value));
            this.getIntBE8Bytes(4199).then((value) => console.log('EnergyNightTotal', value));
            this.getFloatBE(2999).then((value) => console.log('I1', value));
            this.getFloatBE(3027).then((value) => console.log('L1N', value));
            this.getFloatBE(3053).then((value) => console.log('Pwr1', value));

        }, POLING_TIME);
    }
}

const loop = new ModbusLoop(modbusClient, MODBUS_IP, MODBUS_PORT, MODBUS_ID);
loop.connect();