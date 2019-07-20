import { SETFLAG } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SETFLAG:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};