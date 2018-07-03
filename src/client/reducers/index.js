import { combineReducers } from 'redux';
import { avReducer } from './avReducer';
import { aiReducer } from './aiReducer';

export default combineReducers({
    av: avReducer,
    ai: aiReducer,
});
