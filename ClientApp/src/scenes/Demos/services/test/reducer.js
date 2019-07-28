import { POST_TEST } from './types';

export default (state = null, action) => {
    switch (action.type) {
        case POST_TEST:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};