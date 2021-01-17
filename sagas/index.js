import { all } from 'redux-saga/effects';
import amenitiesSagas from './amenities';
import authenticationSagas from './authentication';
import blogSagas from './blog';
import chatSagas from './chat';
import documentsSagas from './documents';
import meSagas from './me';
import propertiesSagas from './properties';
import propertyApplicationsSagas from './propertyApplications';
import usersSagas from './users';

export default function* rootSaga() {
  yield all([
    ...amenitiesSagas,
    ...authenticationSagas,
    ...blogSagas,
    ...chatSagas,
    ...documentsSagas,
    ...meSagas,
    ...propertiesSagas,
    ...propertyApplicationsSagas,
    ...usersSagas,
  ]);
}
