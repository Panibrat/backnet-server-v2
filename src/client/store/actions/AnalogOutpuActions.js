import {
    GET_AO,
    UPDATE_ANALOG_OUTPUT,
} from './actionsConstants';

export const getAOs = (aos) => {
    return {
        type: GET_AO,
        payload: aos
    }
};

export const updateAO = (point) => {
    return {
        type: UPDATE_ANALOG_OUTPUT,
        payload: point
    };
};