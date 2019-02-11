import { fork } from 'redux-saga/effects';
import option from './Options.saga';

export default function*() {
  yield fork(option);
}
