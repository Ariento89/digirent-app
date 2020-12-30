/* eslint-disable max-len */
import { types } from 'ducks/propertyApplications';
import { call, takeLatest } from 'redux-saga/effects';
import { service } from 'services/propertyApplications';
import { request } from 'shared/types';

/* WORKERS */
function* fetchApplicationsForProperties({ payload }) {
  const { callback, propertyId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchApplicationsForProperties, propertyId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* apply({ payload }) {
  const { callback, propertyId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.apply, propertyId);
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
const fetchApplicationsForPropertiesWatcherSaga = function* fetchApplicationsForPropertiesWatcherSaga() {
  yield takeLatest(types.FETCH_APPLICATIONS_FOR_PROPERTIES, fetchApplicationsForProperties);
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
  fetchApplicationsForPropertiesWatcherSaga(),
  applyWatcherSaga(),
  rejectApplicationWatcherSaga(),
  considerApplicationWatcherSaga(),
  processApplicationWatcherSaga(),
  landlordProvideKeysToTenantWatcherSaga(),
  tenantReceivedKeysWatcherSaga(),
  fetchTenantApplicationsWatcherSaga(),
];
