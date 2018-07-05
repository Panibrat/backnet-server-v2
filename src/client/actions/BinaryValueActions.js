import { GET_BV, UPDATE_BINARY_VALUE } from './actionsConstants';

export const getBVs = (bvs) => {
    return {
        type: GET_BV,
        payload: bvs
    }
};

export const updateBV = (point) => {
    return {
        type: UPDATE_BINARY_VALUE,
        payload: point
    };
};