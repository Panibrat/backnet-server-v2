const ModbusRTU = require("modbus-serial");
const modbusClient = new ModbusRTU();

const MODBUS_IP = '192.168.1.155';
const MODBUS_ID = 2;
const MODBUS_PORT = 502;
const POLING_TIME = 1000;
const RECONNECT_TIME = 5000;

modbusClient
    .connectTelnet(MODBUS_IP, { port: MODBUS_PORT })
    .then(() => {
        modbusClient.setID(MODBUS_ID)
    })
    .then(() => {
        console.log('loop read Promise All');
    })
    .catch((e) => {
        console.log('[MODBUS_ERROR: ]', e);
        modbusClient.close();
        console.log('wait and run again');
    });