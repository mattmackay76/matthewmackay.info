import { FETCH_TESTS } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_TESTS:
            return action.payload;
        default:
            return state;
    }
};