import { GET_AI, UPDATE_ANALOG_INPUT } from '../actions/actionsConstants';

export const aiReducer = (ai = [], action) => {
    switch (action.type) {
    case GET_AI:
        return action.payload;
    }

    switch (action.type) {
        case UPDATE_ANALOG_INPUT:
            return ai.map((point) => {
                if (point.title === action.payload.title ) {
                    point.value = action.payload.value;
                }
                return point;
            });
    }
    return ai;
};
