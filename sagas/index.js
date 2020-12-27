import { all } from 'redux-saga/effects';
import authenticationSagas from './authentication';
import meSagas from './me';
import usersSagas from './users';
import apartmentsSagas from './apartments';

export default function* rootSaga() {
  yield all([...usersSagas, ...authenticationSagas, ...meSagas, ...apartmentsSagas]);
}
