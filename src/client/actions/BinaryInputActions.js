import { GET_BI, UPDATE_BINARY_INPUT } from './actionsConstants';

export const getBIs = (bis) => {
    return {
        type: GET_BI,
        payload: bis
    }
};

export const updateBI = (point) => {
    return {
        type: UPDATE_BINARY_INPUT,
        payload: point
    };
};