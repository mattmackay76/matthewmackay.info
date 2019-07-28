import { SETFLAG } from './types';

export default (state = {}, action) => {
    switch (action.type) {
        case SETFLAG:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};