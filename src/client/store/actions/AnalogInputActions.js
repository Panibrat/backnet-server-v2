import { GET_AI, UPDATE_ANALOG_INPUT } from './actionsConstants';

export const getAIs = (ais) => {
    return {
        type: GET_AI,
        payload: ais,
    };
};

export const updateAI = (point) => {
    return {
        type: UPDATE_ANALOG_INPUT,
        payload: point,
    };
};
