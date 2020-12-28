import { GET_AO, UPDATE_ANALOG_OUTPUT } from '../actions/actionsConstants';

export const aoReducer = (ao = {}, { type, payload }) => {
  switch (type) {
    case GET_AO:
      return payload.reduce((acc, point) => {
        return {
            ...acc,
            [ point.title ]: point,
        };
      }, {});

    case UPDATE_ANALOG_OUTPUT:
      return {
          ...ao,
          [ payload.title ]: {
              ...ao[ payload.title ],
              value: payload.value,
          },
      };

    default:
      return ao;
  }
};
