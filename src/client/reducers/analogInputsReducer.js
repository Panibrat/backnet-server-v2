export const analogInputsReducer = (analogInputs = {}, action) => {
    switch (action.type) {
        case 'UPDATE_ANALOG_INPUT_VALUE':
            const updated = { ...analogInputs };
            updated[action.payload.title] = { ...updated[action.payload.title], value: action.payload.value };
            return updated;

        default:
            return { ...analogInputs };
    }
};
