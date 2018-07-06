import { GET_AI, UPDATE_ANALOG_INPUT } from '../actions/actionsConstants';

export const aiReducer = (ai = [], action) => {
    switch (action.type) {
        case GET_AI:
            return action.payload;

        case UPDATE_ANALOG_INPUT:
             return ai.map((point) => point.title === action.payload.title
                ? { ...point, value: action.payload.value }
                : point
            );

        default:
            return ai;
    }
};
