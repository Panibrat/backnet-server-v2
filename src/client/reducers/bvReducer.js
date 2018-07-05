import { GET_BV, UPDATE_BINARY_VALUE } from '../actions/actionsConstants';

export const bvReducer = (bv = [], action) => {
    switch (action.type) {
    case GET_BV:
        return action.payload;
    }

    switch (action.type) {
        case UPDATE_BINARY_VALUE:
            return bv.map((point) => {
                if (point.title === action.payload.title ) {
                    point.value = action.payload.value;
                }
                return point;
            });
    }
    return bv;
};