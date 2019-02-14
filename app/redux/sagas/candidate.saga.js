import { takeLatest, put, call } from 'redux-saga/effects';
import { isEmpty, filter } from 'lodash';
import {
  SET_CANDIDATES,
  GET_CANDIDATES,
  setCandidatesReduxStore,
  resetCandidateForm,
  PULL_OUT_CANDIDATES,
  DELETE_CANDIDATES,
  deleteAllCandidates,
  SELECT_EDIT_CANDIDATE,
  setNewForm,
} from '../action';
import {
  setParsedLocalStorageValue,
  getParsedLocalStorageValue,
} from '../../utils/localStroage';

const saveCandidate = payload => {
  setParsedLocalStorageValue('candidate', payload);
};

const getCandidate = () => getParsedLocalStorageValue('candidate');

export function* resetForm() {
  yield put(resetCandidateForm());
}

export function* clearCandidate() {
  yield put(deleteAllCandidates());
}

export function* putForm(formatToForm) {
  yield put(setNewForm({ formatToForm }));
}

export function* selectCandidateToEdit({ payload }) {
  const id = payload;
  console.log(id);
  const candidates = getCandidate();
  const selectedCandidate = filter(candidates, ['id', id]);
  console.log(selectedCandidate);
  const formatToForm = {
    title: selectedCandidate[0].title,
    callingCode: selectedCandidate[0].callingCode,
    firstName: selectedCandidate[0].firstName,
    lastName: selectedCandidate[0].lastName,
    birthDate: selectedCandidate[0].birthDate,
    national: selectedCandidate[0].national,
    phone: selectedCandidate[0].dailNumber,
    passport: selectedCandidate[0].passport,
    salary: selectedCandidate[0].salary,
    gender: selectedCandidate[0].gender,
    one: selectedCandidate[0].citizenId.substring(0, 1),
    two: selectedCandidate[0].citizenId.substring(1, 5),
    three: selectedCandidate[0].citizenId.substring(5, 10),
    four: selectedCandidate[0].citizenId.substring(10, 12),
    five: selectedCandidate[0].citizenId.substring(12, 13),
    edit: true,
    id,
  };
  if (!isEmpty(formatToForm)) {
    yield put(setNewForm({ ...formatToForm }));
  }
}

export function* pullOutCandidate({ payload }) {
  const wantToPullOuts = Object.keys(payload);
  const candidates = getCandidate();
  const afterDropCandidates = filter(
    candidates,
    item => item.id !== parseInt(wantToPullOuts, 10),
  );
  yield put(setCandidatesReduxStore({ afterDropCandidates }));
  saveCandidate(afterDropCandidates);
  yield call(getCandidates);
}

export function* wipeAllCandidates() {
  yield call(clearCandidate);
  yield call(getCandidates);
}

export function* setCandidates({ payload }) {
  const candidates = getCandidate();
  const isNotHaveExistCandidate = isEmpty(candidates);
  if (isNotHaveExistCandidate) {
    const firstCandidate = [];
    payload.id = 1;
    firstCandidate.push(payload);
    saveCandidate(firstCandidate);
  } else {
    payload.id = candidates.length + 1;
    candidates.push(payload);
    saveCandidate(candidates);
  }
  yield call(getCandidates);
  yield call(resetForm);
}

export function* getCandidates() {
  const candidates = getCandidate();
  if (!isEmpty(candidates)) {
    yield put(setCandidatesReduxStore({ candidates }));
  }
}

export default function* candidate() {
  yield takeLatest(SET_CANDIDATES, setCandidates);
  yield takeLatest(GET_CANDIDATES, getCandidates);
  yield takeLatest(PULL_OUT_CANDIDATES, pullOutCandidate);
  yield takeLatest(DELETE_CANDIDATES, wipeAllCandidates);
  yield takeLatest(SELECT_EDIT_CANDIDATE, selectCandidateToEdit);
}
