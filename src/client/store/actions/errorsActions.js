export const setError = (errorMessage) => {
    return {
        type: 'SET_ERROR',
        payload: errorMessage,
    };
};

export const clearError = () => {
    return {
        type: 'CLEAR_LAST_ERROR',
    };
};
