import { GET_BI, UPDATE_BINARY_INPUT } from '../actions/actionsConstants';

export const biReducer = (bi = {}, { type, payload }) => {
  switch (type) {
    case GET_BI:
      return payload.reduce((acc, point) => {
        return {
                ...acc,
                [ point.title ]: point,
            };
      }, {});

    case UPDATE_BINARY_INPUT:
      return {
            ...bi,
            [ payload.title ]: {
                ...bi[ payload.title ],
                value: payload.value,
            },
        };

    default:
      return bi;
  }
};
