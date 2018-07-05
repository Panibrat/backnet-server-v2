const { io } = require('../server');
const {
    CONNECT,
    UPDATE_ANALOG_INPUT ,
    UPDATE_ANALOG_OUTPUT,
    UPDATE_ANALOG_VALUE,
    UPDATE_BINARY_INPUT,
    UPDATE_BINARY_OUTPUT,
    UPDATE_BINARY_VALUE
} = require('./EventsConstants');

class SocketIO {
    constructor(io) {
        this.io = io;
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
        if (dataPoint.title.search(/AI/i) !== -1) {
            this.updateAI(dataPoint);
        } else if (dataPoint.title.search(/AO/i) !== -1) {
            this.updateAO(dataPoint);
        } else if (dataPoint.title.search(/AV/i) !== -1) {
            this.updateAV(dataPoint);
        } else if (dataPoint.title.search(/BI/i) !== -1) {
            this.updateBI(dataPoint);
        } else if (dataPoint.title.search(/BO/i) !== -1) {
            this.updateBO(dataPoint);
        } else if (dataPoint.title.search(/BV/i) !== -1) {
            this.updateBV(dataPoint);
        }
    }
}

module.exports = new SocketIO(io);
