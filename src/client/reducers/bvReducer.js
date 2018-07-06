import { GET_BV, UPDATE_BINARY_VALUE } from '../actions/actionsConstants';

export const bvReducer = (bv = [], action) => {
    switch (action.type) {
        case GET_BV:
            return action.payload;

        case UPDATE_BINARY_VALUE:
            return bv.map((point) => point.title === action.payload.title
                ? { ...point, value: action.payload.value }
                : point
            );

        default:
            return bv;
    }
};
