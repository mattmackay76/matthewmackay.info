import {
    INITIAL_AUTH_STATE, FETCH_TESTS,
    AUTH_LOGIN, AUTH_LOGOUT, SETFLAG
} from './types';
import { INVALID_LOGIN_ATTEMPT } from './constants';


export const setFlag = (flags) => async (dispatch, getState) => {
    dispatch({
        type: SETFLAG,
        payload: flags
    });
};

export const authLogin = (username, password) => async (dispatch, getState) => {
    const res = await fetch('/api/Auth/Login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const json = await res.json();

    if (json && json.status === 401) {

        dispatch(setFlag({
            [INVALID_LOGIN_ATTEMPT]: true
        }));

    }
    else {
        let auth = {
            isLoggedIn: true,
            token: json.token
        };

        dispatch({
            type: AUTH_LOGIN,
            payload: auth
        });
        dispatch(setFlag({
            INVALID_LOGIN_ATTEMPT: undefined
        }));

        //TODO: after call to auth, store in sessionStorage.initialAuthState (temporary solution to refreshes)
        window.sessionStorage.setItem(INITIAL_AUTH_STATE, JSON.stringify(auth));
    }
}

export const authLogout = () => async dispatch => {
    var auth = {
        isLoggedIn: false,
        token: null
    };
    //TODO: after call to auth, store in sessionStorage.initialAuthState (temporary solution to refreshes)
    window.sessionStorage.setItem(INITIAL_AUTH_STATE, JSON.stringify(auth));

    dispatch({
        type: AUTH_LOGOUT,
        payload: auth
    });
};

export const fetchTests = () => async (dispatch, getState) => {
    const token = getState().authReducer.token;
    const params = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const res = await fetch('/api/Auth/GenerateKey', params );
    //const json = await res.json();
    const text = await res.text();
    
    dispatch({
        type: FETCH_TESTS,
        payload: text
    });
};
