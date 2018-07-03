import { GET_AI } from '../actions/actionsConstants';

export const aiReducer = (ai = [], action) => {
    switch (action.type) {
    case GET_AI:
        return action.payload;
    }
    return [];
};
