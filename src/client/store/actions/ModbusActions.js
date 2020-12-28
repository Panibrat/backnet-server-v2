import { GET_MODBUS_POINTS, UPDATE_MODBUS_VALUE } from './actionsConstants';

export const getModbusPoints = (points) => {
    return {
        type: GET_MODBUS_POINTS,
        payload: points
    }
};

export const updateModbusPoint = (point) => {
    return {
        type: UPDATE_MODBUS_VALUE,
        payload: point
    };
};