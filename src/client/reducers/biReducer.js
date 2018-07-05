import { GET_BI, UPDATE_BINARY_INPUT } from '../actions/actionsConstants';

export const biReducer = (bi = [], action) => {
    switch (action.type) {
    case GET_BI:
        return action.payload;
    }

    switch (action.type) {
        case UPDATE_BINARY_INPUT:
            return bi.map((point) => {
                if (point.title === action.payload.title ) {
                    point.value = action.payload.value;
                }
                return point;
            });
    }

    return bi;
};
