import { TOGGLE_TREND_POINT } from '../actions/actionsConstants';

const defaultState = ['AI3000156', 'AI3000172'];

export const trendsSetReducer = (trends = defaultState, action) => {
    switch (action.type) {
    case TOGGLE_TREND_POINT:
        if (trends.indexOf(action.payload) === -1) {
            return [...trends, action.payload];
        }
        return trends.filter(items => items !== action.payload);

    default:
        return trends;
    }
};
