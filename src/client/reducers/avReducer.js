import { GET_AV, UPDATE_ANALOG_VALUE } from '../actions/actionsConstants';

export const avReducer = (av = [], action) => {
    switch (action.type) {
        case GET_AV:
            return action.payload;

        case UPDATE_ANALOG_VALUE:
            return av.map((point) => {
                if (point.title === action.payload.title ) {
                    point.value = action.payload.value;
                }
                return point;
            });

        default:
            return av;
    }
};
