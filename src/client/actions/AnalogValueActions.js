import { GET_AV, UPDATE_ANALOG_VALUE } from './actionsConstants';

export const getAVs = (avs) => {
    return {
        type: GET_AV,
        payload: avs
    }
};

export const updateAV = (point) => {
    return {
        type: UPDATE_ANALOG_VALUE,
        payload: point
    };
};