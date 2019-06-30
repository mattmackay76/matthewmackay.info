import { FETCH_TESTS, AUTH_LOGIN } from './types';

export const authLogin = () => async dispatch => {
    dispatch({
        type: AUTH_LOGIN,
        payload: {
            isLoggedIn: true,
            token: 'abc123'
        }
    });
};

export const fetchTests = () => async dispatch => {
    const res = await fetch('/api/SampleData/Test');
    const json = await res.json();
    dispatch({
        type: FETCH_TESTS,
        payload: json
    });
};
