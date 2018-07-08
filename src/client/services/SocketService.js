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
} from './EventsConstants';

import { updateAI, getAIs } from '../actions/AnalogInputActions';
import { updateAO, getAOs } from '../actions/AnalogOutpuActions';
import { updateAV, getAVs } from '../actions/AnalogValueActions';
import { updateBI, getBIs } from '../actions/BinaryInputActions';
import { updateBO, getBOs } from '../actions/BinaryOutputActions';
import { updateBV, getBVs } from '../actions/BinaryValueActions';

class SocketService{
    constructor(io) {
        this.socket = io();
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
        this.socket.emit('WRITE_AV', point);
    }

    emit(some) {
        this.socket.emit('test 1', some);
        console.log('test 12 SEND');
    }

    sendAO() {
        this.socket.emit('test AO', {
            ao: 'testedAO',
            value: 34
        });
        console.log('test 12 SEND');
    }
}

export default new SocketService(io)