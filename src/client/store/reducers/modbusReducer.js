import {
  GET_MODBUS_POINTS,
  UPDATE_MODBUS_VALUE,
} from '../actions/actionsConstants';

export const modbusReducer = (modbus = {}, { type, payload }) => {
  switch (type) {
    case GET_MODBUS_POINTS:
      return payload;
/*
        case UPDATE_MODBUS_VALUE:
            return modbus.map((point) => point.title === action.payload.title
                ? { ...point, value: action.payload.value }
                : point
            );*/

/*        case UPDATE_MODBUS_VALUE:
            const updated = modbus[action.payload.title];
            updated.value = action.payload.value;
            return { ...modbus, updated };

        default:
            return modbus;*/

    case UPDATE_MODBUS_VALUE:
      return {
        ...modbus,
        [ payload.title ]: {
            ...modbus[ payload.title ],
            value: payload.value,
        },
    };

    default:
      return modbus;
  }
};
