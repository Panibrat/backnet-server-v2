import {
  GET_MODBUS_POINTS,
  UPDATE_MODBUS_VALUE,
} from '../actions/actionsConstants';

export const modbusReducer = (modbus = {}, { type, payload }) => {
  switch (type) {
    case GET_MODBUS_POINTS:
      return payload;

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
