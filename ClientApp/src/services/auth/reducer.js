import { AUTH_LOGIN, AUTH_LOGOUT } from './types';

export default (state = {}, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
        case AUTH_LOGOUT:
            return action.payload;
        default:
            return state;
    }
};