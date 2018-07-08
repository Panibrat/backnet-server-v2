import { GET_BI, UPDATE_BINARY_INPUT } from '../actions/actionsConstants';

export const biReducer = (bi = [], action) => {
    switch (action.type) {
        case GET_BI:
            return action.payload;

        case UPDATE_BINARY_INPUT:
            return bi.map((point) => point.title === action.payload.title
                ? { ...point, value: action.payload.value }
                : point
            );

        default:
            return bi;
    }
};
