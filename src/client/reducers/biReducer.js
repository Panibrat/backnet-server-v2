import { GET_BI } from '../actions/actionsConstants';

export const biReducer = (bi = [], action) => {
    switch (action.type) {
    case GET_BI:
        return action.payload;
    }
    return bi;
};
