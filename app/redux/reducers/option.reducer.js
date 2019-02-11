import { SET_NATIONAL, SET_CALLING_CODE } from '../action';

export const initialState = {
  national: [],
  callingCode: [],
};

export default function setOptions(state = initialState, action) {
  switch (action.type) {
    case SET_NATIONAL:
      return { ...state, ...action.payload };
    case SET_CALLING_CODE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
