const ModbusRTU = require('modbus-serial');
const modbusTable = require('./modbusRegisterTable.json');
const { getBufferFromTable } = require('./helpers');

const modbusClient = new ModbusRTU();

const MODBUS_IP = '192.168.1.155';
const MODBUS_ID = 2;
const MODBUS_PORT = 502;
const POLING_TIME = 1000;
const RECONNECT_TIME = 5000;

const initBuffer = getBufferFromTable(modbusTable);

class ModbusLoop {
    constructor(client, ip, port, id, buffer) {
        this.buffer = buffer;
        this.client = client;
        this.ip = ip;
        this.port = port;
        this.id = id;
        this.stop = null;
        this.connect = this.connect.bind(this);
        this.readPoint = this.readPoint.bind(this);
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

    getBuffer() {
        return this.buffer;
    }

    getIntBE8Bytes(registerAddress) {
        return this.client.readHoldingRegisters(registerAddress, 8)
            .then((data) => {
                return data.buffer.readIntBE(0, 8);
            })
            .catch(e => console.log(e));
    }

    getFloatBE(registerAddress) {
        return this.client.readHoldingRegisters(registerAddress, 2)
            .then((data) => {
                return data.buffer.readFloatBE();
            })
            .catch(e => console.log(e));
    }

    readPoint(point) {
        switch (point.type) {
        case 'FloatBE':
            return () => {
                return this.getFloatBE(point.address)
                    .then((value) => {
                        return {
                            name: point.name,
                            value: value,
                        };
                    });
            };
        case 'IntBE':
            return () => {
                return this.getIntBE8Bytes(point.address)
                    .then((value) => {
                        return {
                            name: point.name,
                            value: value,
                        };
                    });
            };
        default:
            return null;
        }
    }

    runLoop() {
        const arrTask = Object.keys(this.buffer).map((point) => {
            return this.readPoint(this.buffer[point]);
        });
        this.stop = setInterval(() => {
            console.log(this.buffer);
            arrTask.reduce((sum, currentPromise) => {
                return sum
                    .then(currentPromise)
                    .then((data) => {
                        this.buffer[data.name] = data.value;
                    })
                    .catch(e => console.log(e));
            }, Promise.resolve([]));
        }, POLING_TIME);
    }
}

const loop = new ModbusLoop(modbusClient, MODBUS_IP, MODBUS_PORT, MODBUS_ID, initBuffer);
loop.connect();
