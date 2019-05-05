import { SET_ACTIVE_AREA } from '../actions/actionsConstants';

const defaultState = {
    activeArea: 'xxx'
};

export const plansViewReducer = (plans = defaultState, action) => {
    switch (action.type) {
        case SET_ACTIVE_AREA:
            return { ...plans, activeArea: action.payload };

        default:
            return plans;
    }
};
