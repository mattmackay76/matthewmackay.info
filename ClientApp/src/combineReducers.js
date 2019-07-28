import { combineReducers } from 'redux';
import testReducer from './reducers/testReducer';
import authReducer from './services/auth/reducer';
import flagsReducer from './services/flags/reducer';

export default combineReducers({
    auth: authReducer,
    flags: flagsReducer,
    testReducer
});
