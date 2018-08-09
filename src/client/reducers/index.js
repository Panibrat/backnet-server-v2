import { combineReducers } from 'redux';
import { avReducer } from './avReducer';
import { aiReducer } from './aiReducer';
import { aoReducer } from './aoReducer';
import { biReducer } from './biReducer';
import { boReducer } from './boReducer';
import { bvReducer } from './bvReducer';
import { menuReducer } from './menuReducer';

export default combineReducers({
    av: avReducer,
    ai: aiReducer,
    ao: aoReducer,
    bi: biReducer,
    bo: boReducer,
    bv: bvReducer,
    menu: menuReducer
});
