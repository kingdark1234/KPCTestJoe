import { call, takeLatest, put } from 'redux-saga/effects';
import { map, get } from 'lodash';
import { requestNational, requestCallingCodes } from '../../api/APIRequest';
import {
  GET_NATIONAL,
  setNanional,
  setCallingCode,
  GET_CALLING_CODE,
} from '../action';
let sum = 0;

const formatRes = (title, key, flag, value) => {
  const titleResouce = get(value, title, '');
  const flaged = get(value, 'flag', '');
  const formated = {
    id: sum,
    title: titleResouce,
    selected: false,
    key,
  };
  if (flag) {
    formated.flag = flaged;
  }
  sum += 1;
  return formated;
};

export function* fetchNational() {
  const response = yield call(requestNational);
  const data = get(response, 'data', []);
  const formatResponse = map(
    data,
    formatRes.bind(this, 'demonym', false, 'national'),
  );
  sum = 0;
  yield put(setNanional({ national: formatResponse }));
}

export function* fetchCallingCodes() {
  const response = yield call(requestCallingCodes);
  const data = get(response, 'data', []);
  const formatResponse = map(
    data,
    formatRes.bind(this, 'callingCodes', true, 'callingCodes'),
  );
  sum = 0;
  yield put(setCallingCode({ callingCode: formatResponse }));
}

export default function* option() {
  yield takeLatest(GET_NATIONAL, fetchNational);
  yield takeLatest(GET_CALLING_CODE, fetchCallingCodes);
}
