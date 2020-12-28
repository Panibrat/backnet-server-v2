import { SET_ACTIVE_AREA } from './actionsConstants';

export const setActiveArea = (areaName) => {
    return {
        type: SET_ACTIVE_AREA,
        payload: areaName
    }
};
