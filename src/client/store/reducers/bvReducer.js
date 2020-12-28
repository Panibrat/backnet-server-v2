import { GET_BV, UPDATE_BINARY_VALUE } from '../actions/actionsConstants';

export const bvReducer = (bv = {}, { type, payload }) => {
  switch (type) {
    case GET_BV:
      return payload.reduce((acc, point) => {
        return {
                ...acc,
                [ point.title ]: point,
            };
      }, {});

    case UPDATE_BINARY_VALUE:
      return {
            ...bv,
            [ payload.title ]: {
                ...bv[ payload.title ],
                value: payload.value,
            },
        };

    default:
      return bv;
  }
};

