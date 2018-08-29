const { io } = require('../server');
const buffer = require('../backnet/dataBuffer');

const { isTokenValid } = require('../middleware/checkToken');


const writeAV = require('../backnet/writeData/writeAVpromise');
const writeAO = require('../backnet/writeData/writeAOpromise');
const writeBV = require('../backnet/writeData/writeBVpromise');
const writeBO = require('../backnet/writeData/writeBOpromise');

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
    WRITE_BINARY_OUTPUT
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

            socket.on(WRITE_ANALOG_VALUE, (data) => {
                if (isTokenValid(data.token)) {
                    writeAV(data.point);
                    console.log(`${socket.id} WRITE_ANALOG_VALUE -----> `, data.point);
                }
            });

            socket.on(WRITE_ANALOG_OUTPUT, (data) => {
                if (isTokenValid(data.token)) {
                    writeAO(data.point);
                    console.log(`${socket.id} WRITE_ANALOG_OUTPUT -----> `, data.point);
                }

            });

            socket.on(WRITE_BINARY_VALUE, (data) => {
                if (isTokenValid(data.token)) {
                    writeBV(data.point);
                    console.log(`${socket.id} WRITE_BINARY_VALUE -----> `, data.point);
                }
            });

            socket.on(WRITE_BINARY_OUTPUT, (data) => {
                if (isTokenValid(data.token)) {
                    writeBO(data.point);
                    console.log(`${socket.id} WRITE_BINARY_OUTPUT -----> `, data.point);
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
        }
    }
}

module.exports = new SocketIO(io);
