import { FETCH_TESTS } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_TESTS:
            return action.payload;
        default:
            return state;
    }
};