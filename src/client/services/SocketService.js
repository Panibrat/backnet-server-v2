import io from 'socket.io-client';
import { store } from '../index';
import {
    CONNECT,
    UPDATE_ANALOG_INPUT ,
    UPDATE_ANALOG_OUTPUT,
    UPDATE_ANALOG_VALUE,
    UPDATE_BINARY_INPUT,
    UPDATE_BINARY_OUTPUT,
    UPDATE_BINARY_VALUE

} from './EventsConstants';

import { updateAI } from '../actions/AnalogInputActions';
import { updateAO } from '../actions/AnalogOutpuActions';
import { updateAV } from '../actions/AnalogValueActions';
import { updateBI } from '../actions/BinaryInputActions';
import { updateBO } from '../actions/BinaryOutputActions';
import { updateBV } from '../actions/BinaryValueActions';

class SocketService{
    constructor(io) {
        this.socket = io();
        this.socket.on(CONNECT, () => {
            console.log('connected to server :)');
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