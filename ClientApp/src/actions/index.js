import { INITIAL_AUTH_STATE, FETCH_TESTS, AUTH_LOGIN, AUTH_LOGOUT } from './types';
import { toast } from 'react-toastify';

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

    var auth = {};

    if (json && json.status === 401) {
        //TODO: dispatch an AUTH_LOGIN_FAILED?
        //TODO: Please don't do UI stuff from within an action, remove this.. just a POC
        //TODO: Let's dispatch info about failure into state and another component (Nav?) pick it up and toast
        toast("Invalid login");
        auth = {
            isLoggedIn: false,
            token: null
        };
    }
    else {
        auth = {
            isLoggedIn: true,
            token: json.token
        };
    }

    //TODO: after call to auth, store in sessionStorage.initialAuthState (temporary solution to refreshes)
    window.sessionStorage.setItem(INITIAL_AUTH_STATE, JSON.stringify(auth));

    dispatch({
        type: AUTH_LOGIN,
        payload: auth
    });
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
