import { GET_AV, UPDATE_ANALOG_VALUE } from '../actions/actionsConstants';

export const avReducer = (av = [], { type, payload }) => {
  switch (type) {
    case GET_AV:
      return payload.reduce((acc, point) => {
        return {
        ...acc,
        [ point.title ]: point,
      };
      }, {});

    case UPDATE_ANALOG_VALUE:
      return { ...av,
      [ payload.title ]: {
        ...av[ payload.title ],
        value: payload.value,
      },
    };

    default:
      return av;
  }
};
