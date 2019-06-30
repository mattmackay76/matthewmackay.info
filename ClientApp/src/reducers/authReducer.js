import { AUTH_LOGIN } from '../actions/types';

const initalState = {
    isLoggedIn: false,
    token: null
};

export default (state = initalState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return action.payload;
        default:
            return state;
    }
};