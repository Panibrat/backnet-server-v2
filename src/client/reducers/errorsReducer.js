export const errorsReducer = (errors = ['error test message', 'cannot read data', 'kill your programmer', 'check your money :)'], action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return [...errors, action.payload];

        case 'CLEAR_LAST_ERROR':
            return errors.slice(0, -1);

        default:
            return errors;
    }
};
