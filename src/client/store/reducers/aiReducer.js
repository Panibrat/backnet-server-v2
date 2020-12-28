import { GET_AI, UPDATE_ANALOG_INPUT } from '../actions/actionsConstants';

export const aiReducer = (ai = {}, { type, payload }) => {
  switch (type) {
    case GET_AI:
      return payload.reduce((acc, point) => {
        return {
                ...acc,
                [ point.title ]: point,
            };
      }, {});

    case UPDATE_ANALOG_INPUT:
      return {
            ...ai,
            [ payload.title ]: {
                ...ai[ payload.title ],
                value: payload.value,
            },
        };

    default:
      return ai;
  }
};
