
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? user : {};

export const userReducer = (user = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return { ...user };

        case 'SET_USER':
            return { ...action.payload };

        case 'CLEAR_USER':
            return {};

        default:
            return user;
    }
};
