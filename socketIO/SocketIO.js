const { io } = require('../server');
const buffer = require('../backnet/dataBuffer');
const modbusLoop = require('../modbus/modbusLoop');

const { isTokenValid } = require('../middleware/checkToken');
const writeAV = require('../backnet/writeData/writeAVpromise');
const writeAO = require('../backnet/writeData/writeAOpromise');
const writeBV = require('../backnet/writeData/writeBVpromise');
const writeBO = require('../backnet/writeData/writeBOpromise');

const modbusTypes = ["IntBE", 'FloatBE'];

const {
    CONNECT,
    CREATE_ANALOG_INPUTS,
    CREATE_ANALOG_OUTPUT,
    CREATE_ANALOG_VALUE,
    CREATE_BINARY_INPUT,
    CREATE_BINARY_OUTPUT,
    CREATE_BINARY_VALUE,
    UPDATE_ANALOG_INPUT,
    UPDATE_ANALOG_OUTPUT,
    UPDATE_ANALOG_VALUE,
    UPDATE_BINARY_INPUT,
    UPDATE_BINARY_OUTPUT,
    UPDATE_BINARY_VALUE,
    WRITE_ANALOG_VALUE,
    WRITE_ANALOG_OUTPUT,
    WRITE_BINARY_VALUE,
    WRITE_BINARY_OUTPUT,
    UPDATE_MODBUS_VALUE,
    CREATE_MODBUS_VALUES,
} = require('./EventsConstants');

class SocketIO {
    constructor(io) {
        this.io = io;
        this.io.on('connection', (socket) => {
            console.log('user connected', socket.id);

            socket.emit(CREATE_ANALOG_INPUTS, buffer.getAnalogInputsData());
            socket.emit(CREATE_ANALOG_OUTPUT, buffer.getAnalogOutputsData());
            socket.emit(CREATE_ANALOG_VALUE, buffer.getAnalogValueData());
            socket.emit(CREATE_BINARY_INPUT, buffer.getBinaryInputsData());
            socket.emit(CREATE_BINARY_OUTPUT, buffer.getBinaryOutputsData());
            socket.emit(CREATE_BINARY_VALUE, buffer.getBinaryValueData());
            socket.emit(CREATE_MODBUS_VALUES, modbusLoop.getBuffer());

            socket.on(WRITE_ANALOG_VALUE, (data) => {
                if (isTokenValid(data.token)) {
                    writeAV(data.point)
                        .then((av) => {
                            console.log(`${socket.id} WRITE_ANALOG_VALUE -----> `, av);
                        })
                        .catch((e) => {
                            console.log('[ERROR] to write AV');
                        });
                }
            });

            socket.on(WRITE_ANALOG_OUTPUT, (data) => {
                if (isTokenValid(data.token)) {
                    writeAO(data.point)
                        .then((ao) => {
                            console.log(`${socket.id} WRITE_ANALOG_OUTPUT -----> `, ao);
                        })
                        .catch((e) => {
                            console.log('[ERROR] to write AO');
                        });
                }
            });

            socket.on(WRITE_BINARY_VALUE, (data) => {
                if (isTokenValid(data.token)) {
                    writeBV(data.point)
                        .then((bv) => {
                            console.log(`${socket.id} WRITE_BINARY_VALUE -----> `, bv);
                        })
                        .catch((e) => {
                            console.log('[ERROR] to write BV');
                        });
                }
            });

            socket.on(WRITE_BINARY_OUTPUT, (data) => {
                if (isTokenValid(data.token)) {
                    writeBO(data.point)
                        .then((bo) => {
                            console.log(`${socket.id} WRITE_BINARY_OUTPUT -----> `, bo);
                        })
                        .catch((e) => {
                            console.log('[ERROR] to write BO');
                        });
                }
            });
        });
    }

    updateAI(ai) {
        this.io.emit(UPDATE_ANALOG_INPUT, ai);
    }

    updateAO(ao) {
        this.io.emit(UPDATE_ANALOG_OUTPUT, ao);
    }

    updateAV(av) {
        this.io.emit(UPDATE_ANALOG_VALUE, av);
    }

    updateBI(bi) {
        this.io.emit(UPDATE_BINARY_INPUT, bi);
    }

    updateBO(bo) {
        this.io.emit(UPDATE_BINARY_OUTPUT, bo);
    }

    updateBV(bv) {
        this.io.emit(UPDATE_BINARY_VALUE, bv);
    }

    updateModbusPoint(dataPoint) {
        this.io.emit(UPDATE_MODBUS_VALUE, dataPoint);
    }


    updateData(dataPoint) {
        if (dataPoint.title.search(/BO/i) !== -1) {
            this.updateBO(dataPoint);
        } else if (dataPoint.title.search(/AI/i) !== -1) {
            this.updateAI(dataPoint);
        } else if (dataPoint.title.search(/AO/i) !== -1) {
            this.updateAO(dataPoint);
        } else if (dataPoint.title.search(/AV/i) !== -1) {
            this.updateAV(dataPoint);
        } else if (dataPoint.title.search(/BI/i) !== -1) {
            this.updateBI(dataPoint);
        } else if (dataPoint.title.search(/BV/i) !== -1) {
            this.updateBV(dataPoint);
        } else if (dataPoint.type && modbusTypes.indexOf(dataPoint.type) > -1) {
            this.updateModbusPoint(dataPoint);
        }
    }
}

module.exports = new SocketIO(io);
