﻿import { AUTH_LOGIN } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return action.payload;
        default:
            return state;
    }
};