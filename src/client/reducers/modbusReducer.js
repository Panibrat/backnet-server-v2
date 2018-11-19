import { GET_MODBUS_POINTS, UPDATE_MODBUS_VALUE } from '../actions/actionsConstants';

export const modbusReducer = (modbus = [], action) => {
    switch (action.type) {
        case GET_MODBUS_POINTS:
            return action.payload;

        case UPDATE_MODBUS_VALUE:
            return modbus.map((point) => point.title === action.payload.title
                ? { ...point, value: action.payload.value }
                : point
            );

        default:
            return modbus;
    }
};
