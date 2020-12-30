/* eslint-disable max-len */
import { types } from 'ducks/apartmentApplications';
import { call, takeLatest } from 'redux-saga/effects';
import { service } from 'services/apartmentApplications';
import { request } from 'shared/types';

/* WORKERS */
function* fetchApplicationsForApartments({ payload }) {
  const { callback, apartmentId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchApplicationsForApartments, apartmentId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* apply({ payload }) {
  const { callback, apartmentId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.apply, apartmentId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* rejectApplication({ payload }) {
  const { callback, applicationId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.rejectApplication, applicationId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* considerApplication({ payload }) {
  const { callback, applicationId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.considerApplication, applicationId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* processApplication({ payload }) {
  const { callback, applicationId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.processApplication, applicationId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* landlordProvideKeysToTenant({ payload }) {
  const { callback, applicationId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.landlordProvideKeysToTenant, applicationId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* tenantReceivedKeys({ payload }) {
  const { callback, applicationId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.tenantReceivedKeys, applicationId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* fetchTenantApplications({ payload }) {
  const { callback } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchTenantApplications);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const fetchApplicationsForApartmentsWatcherSaga = function* fetchApplicationsForApartmentsWatcherSaga() {
  yield takeLatest(types.FETCH_APPLICATIONS_FOR_APARTMENTS, fetchApplicationsForApartments);
};

const applyWatcherSaga = function* applyWatcherSaga() {
  yield takeLatest(types.APPLY, apply);
};

const rejectApplicationWatcherSaga = function* rejectApplicationWatcherSaga() {
  yield takeLatest(types.REJECT_APPLICATION, rejectApplication);
};

const considerApplicationWatcherSaga = function* considerApplicationWatcherSaga() {
  yield takeLatest(types.CONSIDER_APPLICATION, considerApplication);
};

const processApplicationWatcherSaga = function* processApplicationWatcherSaga() {
  yield takeLatest(types.PROCESS_APPLICATION, processApplication);
};

const landlordProvideKeysToTenantWatcherSaga = function* landlordProvideKeysToTenantWatcherSaga() {
  yield takeLatest(types.LANDLORD_PROVIDE_KEYS_TO_TENANT, landlordProvideKeysToTenant);
};

const tenantReceivedKeysWatcherSaga = function* tenantReceivedKeysWatcherSaga() {
  yield takeLatest(types.TENANT_RECEIVED_KEYS, tenantReceivedKeys);
};

const fetchTenantApplicationsWatcherSaga = function* fetchTenantApplicationsWatcherSaga() {
  yield takeLatest(types.FETCH_TENANT_APPLICATIONS, fetchTenantApplications);
};

export default [
  fetchApplicationsForApartmentsWatcherSaga(),
  applyWatcherSaga(),
  rejectApplicationWatcherSaga(),
  considerApplicationWatcherSaga(),
  processApplicationWatcherSaga(),
  landlordProvideKeysToTenantWatcherSaga(),
  tenantReceivedKeysWatcherSaga(),
  fetchTenantApplicationsWatcherSaga(),
];
