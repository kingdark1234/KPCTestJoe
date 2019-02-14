import { fork } from 'redux-saga/effects';
import option from './Options.saga';
import candidate from './candidate.saga';

export default function*() {
  yield fork(option);
  yield fork(candidate);
}
