import { INITIAL_AUTH_STATE, FETCH_TESTS, AUTH_LOGIN } from './types';

export const authLogin = () => async dispatch => {
    //TODO: POST to auth to get this auth object
    var auth = {
        isLoggedIn: true,
        token: 'abc123'
    };

    //TODO: after call to auth, store in sessionStorage.initialAuthState (temporary solution to refreshes)
    window.sessionStorage.setItem(INITIAL_AUTH_STATE, JSON.stringify(auth));

    dispatch({
        type: AUTH_LOGIN,
        payload: auth
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
