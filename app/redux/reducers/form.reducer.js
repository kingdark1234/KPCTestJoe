import moment from 'moment';
import {
  SET_CANDIDATES_FORM,
  RESET_CANDIDATE_FORM,
  SET_NEW_FORM,
} from '../action';
export const initialState = {
  title: 'Mr.',
  callingCode: '+66',
  firstName: '',
  lastName: '',
  birthDate: moment().format('MM/DD/YY'),
  national: '-- Please Select --',
  phone: '',
  passport: '',
  salary: '',
  gender: '',
  one: '',
  two: '',
  three: '',
  four: '',
  five: '',
  edit: false,
};

export default function setForm(state = initialState, action) {
  switch (action.type) {
    case SET_NEW_FORM:
      return { ...action.payload };
    case SET_CANDIDATES_FORM:
      return { ...state, [action.payload.key]: action.payload.value };
    case RESET_CANDIDATE_FORM:
      return initialState;
    default:
      return state;
  }
}
