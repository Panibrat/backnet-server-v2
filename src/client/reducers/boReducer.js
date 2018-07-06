import { GET_BO, UPDATE_BINARY_OUTPUT } from '../actions/actionsConstants';

export const boReducer = (bo = [], action) => {
    switch (action.type) {
        case GET_BO:
            return action.payload;

        case UPDATE_BINARY_OUTPUT:
            return bo.map((point) => point.title === action.payload.title
                ? { ...point, value: action.payload.value }
                : point
            );

        default:
            return bo;
    }
};
