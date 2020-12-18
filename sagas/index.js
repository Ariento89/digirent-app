import { all } from 'redux-saga/effects';
import usersSagas from './users';
import authenticationSagas from './authentication';

export default function* rootSaga() {
  yield all([...usersSagas, ...authenticationSagas]);
}
