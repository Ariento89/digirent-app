import { all } from 'redux-saga/effects';
import amenitiesSagas from './amenities';
import apartmentsSagas from './apartments';
import apartmentApplicationsSagas from './apartmentApplications';
import authenticationSagas from './authentication';
import meSagas from './me';
import usersSagas from './users';

export default function* rootSaga() {
  yield all([
    ...amenitiesSagas,
    ...apartmentsSagas,
    ...apartmentApplicationsSagas,
    ...authenticationSagas,
    ...meSagas,
    ...usersSagas,
  ]);
}
