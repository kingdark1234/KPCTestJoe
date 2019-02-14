import { result } from 'lodash';

export const getSelector = pathFromState => state =>
  result(state, pathFromState, null);
