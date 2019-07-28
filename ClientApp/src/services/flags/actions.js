import { SETFLAG } from './types';

export const setFlag = (flags) => async (dispatch, getState) => {
    dispatch({
        type: SETFLAG,
        payload: flags
    });
};
