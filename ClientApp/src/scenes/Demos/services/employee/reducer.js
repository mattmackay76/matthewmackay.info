import { GET_EMPLOYEES, POST_EMPLOYEE } from './types';

const INITIAL_STATE = {
    employee: null,
    employeeList: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_EMPLOYEE:
            return { ...state, employee: action.payload };
        case GET_EMPLOYEES:
            return { ...state, employeeList: action.payload };
        default:
            return state;
    }
};