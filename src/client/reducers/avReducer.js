import { GET_AV } from '../actions/actionsConstants';

export const aiReducer = (av = [], action) => {
    switch (action.type) {
        case GET_AV:
            return action.payload;
    }
    return [];
};
