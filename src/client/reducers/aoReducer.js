import { GET_AO, UPDATE_ANALOG_OUTPUT } from '../actions/actionsConstants';

export const aoReducer = (ao = [], action) => {
    switch (action.type) {
        case GET_AO:
            return action.payload;
    }

    switch (action.type) {
        case UPDATE_ANALOG_OUTPUT:
            return ao.map((point) => {
                if (point.title === action.payload.title ) {
                    point.value = action.payload.value;
                }
                return point;
            });
    }

    return ao;
};
