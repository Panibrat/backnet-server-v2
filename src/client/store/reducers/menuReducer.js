import { CLOSE_MENU, OPEN_MENU, SET_TITLE } from '../actions/actionsConstants';

export const menuReducer = (menu = { isMenuOpen: false, title: 'Home Page' }, action) => {
    switch (action.type) {
        case OPEN_MENU:
            return { ...menu, isMenuOpen: true };

        case CLOSE_MENU:
            return { ...menu, isMenuOpen: false };

        case SET_TITLE:
            return { ...menu, title: action.payload };

        default:
            return menu;
    }
};
