import { SET_CANDIDATES_REDUX_STORE, DELETE_ALL_CANDIDATES } from '../action';
export const initialState = {
  candidates: [],
};

export default function setCandidates(state = initialState, action) {
  switch (action.type) {
    case SET_CANDIDATES_REDUX_STORE:
      return { ...action.payload };
    case DELETE_ALL_CANDIDATES:
      return initialState;
    default:
      return state;
  }
}
