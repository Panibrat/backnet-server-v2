import { TOGGLE_TREND_POINT } from './actionsConstants';

export const toggleTrendPointVisibilityAction = (areaName) => {
    return {
        type: TOGGLE_TREND_POINT,
        payload: areaName,
    };
};
