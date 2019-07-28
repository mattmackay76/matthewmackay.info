﻿import { POST_TEST, SETFLAG } from './types';
import { EXPIRED_LOGIN_ATTEMPT } from './constants';
import { authLogout } from '../services/auth/actions';


export const setFlag = (flags) => async (dispatch, getState) => {
    dispatch({
        type: SETFLAG,
        payload: flags
    });
};


export const postTest = (formData, id) => async (dispatch, getState) => {
    const token = getState().auth.token;
    let body = { ...formData };

    if (id)
        body = { id, ...formData };
    
    const params = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    };

    let res = null; //response
    try {
        res = await fetch('/api/SampleData/Test', params);
        const json = await res.json();
        dispatch({
            type: POST_TEST,
            payload: json
        });
    } catch(e) {
        if (res.status === 401) {
            dispatch(setFlag({
                [EXPIRED_LOGIN_ATTEMPT]: true
            }));
            dispatch(authLogout());
            
        }
    }
};

