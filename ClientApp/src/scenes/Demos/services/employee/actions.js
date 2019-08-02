import { POST_EMPLOYEE, GET_EMPLOYEES, UPDATE_EMPLOYEES } from './types';
import { EXPIRED_LOGIN_ATTEMPT } from '../../../../services/flags/constants';
import { PAYROLL_API_ERROR } from '../flags/constants';
import { authLogout } from '../../../../services/auth/actions';
import { setFlag } from '../../../../services/flags/actions';

export const postEmployee = (formData, id) => async (dispatch, getState) => {
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
        res = await fetch('/api/PayrollDemo/Employee', params);
        const json = await res.json();

        if (res.status >= 400) {
            dispatch(setFlag({
                [PAYROLL_API_ERROR]: `${json.title} - ${Object.keys(json.errors).join()}`,
            }));
            return;
        }

        dispatch({
            type: POST_EMPLOYEE,
            payload: json
        });
        dispatch({
            type: UPDATE_EMPLOYEES,
            payload: json
        }); 
    } catch (e) {
        if (res.status === 401) {
            dispatch(setFlag({
                [EXPIRED_LOGIN_ATTEMPT]: true
            }));
            dispatch(authLogout());
        }
    }
};

export const getEmployees = () => async (dispatch, getState) => {
    const token = getState().auth.token;
    const params = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    let res = null; //response
    try {
        res = await fetch('/api/PayrollDemo/Employees', params);
        const json = await res.json();

        if (res.status >= 400) {
            dispatch(setFlag({
                [PAYROLL_API_ERROR]: `${json.title} - ${Object.keys(json.errors).join()}`,
            }));
            return;
        }

        dispatch({
            type: GET_EMPLOYEES,
            payload: json
        });
    } catch (e) {
        if (res.status === 401) {
            dispatch(setFlag({
                [EXPIRED_LOGIN_ATTEMPT]: true
            }));
            dispatch(authLogout());
            return;
        }
    }
};
