import io from 'socket.io-client';
import { store } from '../index';
import {
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
} from './EventsConstants';

import { updateAI, getAIs } from '../actions/AnalogInputActions';
import { updateAO, getAOs } from '../actions/AnalogOutpuActions';
import { updateAV, getAVs } from '../actions/AnalogValueActions';
import { updateBI, getBIs } from '../actions/BinaryInputActions';
import { updateBO, getBOs } from '../actions/BinaryOutputActions';
import { updateBV, getBVs } from '../actions/BinaryValueActions';

let user = JSON.parse(localStorage.getItem('user'));
const token = user ? user.token : null;

class SocketService{
    constructor(io) {
        this.socket = io();
        this.token = token;
        this.socket.on(CONNECT, () => {
            console.log('connected to server :)');
        });

        this.socket.on(CREATE_ANALOG_INPUTS, (points) => {
            store.dispatch(getAIs(points));
        });
        this.socket.on(CREATE_ANALOG_OUTPUT, (points) => {
            store.dispatch(getAOs(points));
        });
        this.socket.on(CREATE_ANALOG_VALUE, (points) => {
            store.dispatch(getAVs(points));
        });
        this.socket.on(CREATE_BINARY_INPUT, (points) => {
            store.dispatch(getBIs(points));
        });
        this.socket.on(CREATE_BINARY_OUTPUT, (points) => {
            store.dispatch(getBOs(points));
        });
        this.socket.on(CREATE_BINARY_VALUE, (points) => {
            store.dispatch(getBVs(points));
        });

        this.socket.on(UPDATE_ANALOG_INPUT, (point) => {
            store.dispatch(updateAI(point));
        });

        this.socket.on(UPDATE_ANALOG_OUTPUT, (point) => {
            store.dispatch(updateAO(point));
        });

        this.socket.on(UPDATE_ANALOG_VALUE, (point) => {
            store.dispatch(updateAV(point));
        });

        this.socket.on(UPDATE_BINARY_INPUT, (point) => {
            store.dispatch(updateBI(point));
        });

        this.socket.on(UPDATE_BINARY_OUTPUT, (point) => {
            store.dispatch(updateBO(point));
        });

        this.socket.on(UPDATE_BINARY_VALUE, (point) => {
            store.dispatch(updateBV(point));
        });
    }

    writeAV(point) {
        const data = {
            point: point,
            token: this.token
        };
        this.socket.emit(WRITE_ANALOG_VALUE, data);
    }

    writeAO(point) {
        const data = {
            point: point,
            token: this.token
        };
        this.socket.emit(WRITE_ANALOG_OUTPUT, data);
    }

    writeBV(point) {
        const data = {
            point: point,
            token: this.token
        };
        this.socket.emit(WRITE_BINARY_VALUE, data);
    }

    writeBO(point) {
        const data = {
            point: point,
            token: this.token
        };
        this.socket.emit(WRITE_BINARY_OUTPUT, data);
    }
}

export default new SocketService(io);
