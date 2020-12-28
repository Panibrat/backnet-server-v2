import { CLOSE_MENU, OPEN_MENU, SET_TITLE } from './actionsConstants';

export const openMenu = () => {
    return {
        type: OPEN_MENU
    };
};

export const closeMenu = () => {
    return {
        type: CLOSE_MENU
    }
};

export const setTitle = (title) => {
    return {
        type: SET_TITLE,
        payload: title,
    }
};
