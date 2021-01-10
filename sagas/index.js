import { all } from 'redux-saga/effects';
import amenitiesSagas from './amenities';
import authenticationSagas from './authentication';
import chatSagas from './chat';
import meSagas from './me';
import propertiesSagas from './properties';
import propertyApplicationsSagas from './propertyApplications';
import usersSagas from './users';

export default function* rootSaga() {
  yield all([
    ...amenitiesSagas,
    ...authenticationSagas,
    ...chatSagas,
    ...meSagas,
    ...propertiesSagas,
    ...propertyApplicationsSagas,
    ...usersSagas,
  ]);
}
