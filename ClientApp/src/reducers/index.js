import { combineReducers } from 'redux';
import testReducer from './testReducer';
import authReducer from '../services/auth/reducers';
import flagReducer from './flagReducer';

export default combineReducers({
    auth: authReducer,
    flags: flagReducer,
    testReducer
});
