import { POST_EMPLOYEE, GET_EMPLOYEES, UPDATE_EMPLOYEES } from './types';
import { EXPIRED_LOGIN_ATTEMPT } from '../../../../services/flags/constants';
import { authLogout } from '../../../../services/auth/actions';
import { setFlag } from '../../../../services/flags/actions';


//TODO: clean this up
/* Example of server returned validation error postEmployee
 {
   "errors":{
      "salaryPerPeriod":[
         "Could not convert string to decimal: 2000assfa222. Path 'salaryPerPeriod', line 1, position 121."
      ]
   },
   "title":"One or more validation errors occurred.",
   "status":400,
   "traceId":"0HLOLDPT20BBG:00000007"
}
 * */
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
        }
    }
};
