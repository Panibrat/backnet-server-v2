import { GET_BO, UPDATE_BINARY_OUTPUT } from '../actions/actionsConstants';

export const boReducer = (bo = {}, { type, payload }) => {
  switch (type) {
    case GET_BO:
      return payload.reduce((acc, point) => {
        return {
                ...acc,
                [ point.title ]: point,
            };
      }, {});

    case UPDATE_BINARY_OUTPUT:
      return {
            ...bo,
            [ payload.title ]: {
                ...bo[ payload.title ],
                value: payload.value,
            },
        };

    default:
      return bo;
  }
};
