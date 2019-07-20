import { combineReducers } from 'redux';
import testReducer from './testReducer';
import authReducer from './authReducer';
import flagReducer from './flagReducer';

export default combineReducers({
    testReducer,
    authReducer,
    flagReducer
});
