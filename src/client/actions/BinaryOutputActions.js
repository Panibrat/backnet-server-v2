import { GET_BO, UPDATE_BINARY_OUTPUT } from './actionsConstants';

export const getBOs = (bos) => {
    return {
        type: GET_BO,
        payload: bos
    }
};

export const updateBO = (point) => {
    return {
        type: UPDATE_BINARY_OUTPUT,
        payload: point
    };
};