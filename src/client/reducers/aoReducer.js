import { GET_AO, UPDATE_ANALOG_OUTPUT } from '../actions/actionsConstants';

export const aoReducer = (ao = [], action) => {
    switch (action.type) {
        case GET_AO:
            return action.payload;

        case UPDATE_ANALOG_OUTPUT:
            return ao.map((point) => point.title === action.payload.title
                ? { ...point, value: action.payload.value }
                : point
            );

        default:
            return ao;
    }
};
