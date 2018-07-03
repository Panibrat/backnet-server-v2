import { GET_BV } from '../actions/actionsConstants';

export const bvReducer = (bv = [], action) => {
    switch (action.type) {
    case GET_BV:
        return action.payload;
    }
    return bv;
};
