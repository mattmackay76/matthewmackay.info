import { GET_TESTS, POST_TEST } from './types';

export default (state = null, action) => {
    switch (action.type) {
        case POST_TEST:
            return { ...state, ...action.payload };
        case GET_TESTS:
            return { ...state, tests: action.payload };
        default:
            return state;
    }
};