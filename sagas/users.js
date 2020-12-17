import { types } from 'ducks/users';
import { call, takeLatest } from 'redux-saga/effects';
import { service } from 'services/users';
import { request } from 'shared/types';

/* WORKERS */
function* registerLandlord({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.registerLandlord, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* registerTenant({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.registerTenant, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const registerLandlordWatcherSaga = function* registerLandlordWatcherSaga() {
  yield takeLatest(types.REGISTER_LANDLORD, registerLandlord);
};

const registerTenantWatcherSaga = function* registerTenantWatcherSaga() {
  yield takeLatest(types.REGISTER_TENANT, registerTenant);
};

export default [registerLandlordWatcherSaga(), registerTenantWatcherSaga()];
