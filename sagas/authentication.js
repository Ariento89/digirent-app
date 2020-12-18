import { types } from 'ducks/authentication';
import { call, takeLatest } from 'redux-saga/effects';
import { service } from 'services/authentication';
import { request } from 'shared/types';

/* WORKERS */
function* login({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.login, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const loginWatcherSaga = function* loginWatcherSaga() {
  yield takeLatest(types.REGISTER_LANDLORD, login);
};

export default [loginWatcherSaga()];
