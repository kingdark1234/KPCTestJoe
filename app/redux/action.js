import { createAction } from 'redux-actions';

export const GET_NATIONAL = 'GET_NATIONAL';
export const SET_NATIONAL = 'SET_NATIONAL';
export const GET_CALLING_CODE = 'GET_CALLING_CODE';
export const SET_CALLING_CODE = 'SET_CALLING_CODE';

export const getNanional = createAction(GET_NATIONAL);
export const setNanional = createAction(SET_NATIONAL);
export const getCallingCode = createAction(GET_CALLING_CODE);
export const setCallingCode = createAction(SET_CALLING_CODE);
