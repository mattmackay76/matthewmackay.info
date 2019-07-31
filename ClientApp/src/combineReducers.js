import { combineReducers } from 'redux';
import testReducer from './scenes/Demos/services/test/reducer';
import employeeReducer from './scenes/Demos/services/employee/reducer';
import authReducer from './services/auth/reducer';
import flagsReducer from './services/flags/reducer';

export default combineReducers({
    auth: authReducer,
    flags: flagsReducer,
    testReducer,
    employeeReducer,
});
