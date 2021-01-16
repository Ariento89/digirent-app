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

function* fetchAllUsers({ payload }) {
  const { callback } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchAllUsers);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* fetchAllLandlords({ payload }) {
  const { callback } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchAllLandlords);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* fetchAllTenants({ payload }) {
  const { callback } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchAllTenants);
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

const fetchAllUsersWatcherSaga = function* fetchAllUsersWatcherSaga() {
  yield takeLatest(types.FETCH_ALL_USERS, fetchAllUsers);
};

const fetchAllLandlordsWatcherSaga = function* fetchAllLandlordsWatcherSaga() {
  yield takeLatest(types.FETCH_ALL_LANDLORDS, fetchAllLandlords);
};

const fetchAllTenantsWatcherSaga = function* fetchAllTenantsWatcherSaga() {
  yield takeLatest(types.FETCH_ALL_TENANTS, fetchAllTenants);
};

export default [
  registerLandlordWatcherSaga(),
  registerTenantWatcherSaga(),
  fetchAllUsersWatcherSaga(),
  fetchAllLandlordsWatcherSaga(),
  fetchAllTenantsWatcherSaga(),
];
