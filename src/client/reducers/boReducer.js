import { GET_BO } from '../actions/actionsConstants';

export const boReducer = (bo = [], action) => {
    switch (action.type) {
    case GET_BO:
        return action.payload;
    }
    return bo;
};
