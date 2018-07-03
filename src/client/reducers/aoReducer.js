import { GET_AO } from '../actions/actionsConstants';

export const aoReducer = (ao = [], action) => {
    switch (action.type) {
        case GET_AO:
            return action.payload;
    }
    return ao;
};
