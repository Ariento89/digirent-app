import { actions, types } from 'ducks/me';
import { call, put, takeLatest } from 'redux-saga/effects';
import { service } from 'services/me';
import { request } from 'shared/types';

/* WORKERS */
function* updateProfileInformation({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.updateProfileInformation, data);
    yield put(
      actions.save({
        type: types.UPDATE_PROFILE_INFORMATION,
        me: response.data,
      }),
    );

    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* fetchMe({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.me);
    yield put(
      actions.save({
        type: types.GET_ME,
        me: response.data,
      }),
    );

    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* updatePassword({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.updatePassword, data);
    yield put(
      actions.save({
        type: types.UPDATE_PASSWORD,
        me: response.data,
      }),
    );

    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* setTenantLookingFor({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.setTenantLookingFor, data);
    yield put(
      actions.save({
        type: types.SET_TENANT_LOOKING_FOR,
        me: response.data,
      }),
    );

    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* setUserBankDetails({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.setUserBankDetails, data);
    yield put(
      actions.save({
        type: types.SET_USER_BANK_DETAILS,
        me: response.data,
      }),
    );

    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const updateProfileInformationWatcherSaga = function* updateProfileInformationWatcherSaga() {
  yield takeLatest(types.UPDATE_PROFILE_INFORMATION, updateProfileInformation);
};

const updatePasswordWatcherSaga = function* updatePasswordWatcherSaga() {
  yield takeLatest(types.UPDATE_PASSWORD, updatePassword);
};

const setTenantLookingForWatcherSaga = function* setTenantLookingForWatcherSaga() {
  yield takeLatest(types.SET_TENANT_LOOKING_FOR, setTenantLookingFor);
};

const setUserBankDetailsWatcherSaga = function* setUserBankDetailsWatcherSaga() {
  yield takeLatest(types.SET_USER_BANK_DETAILS, setUserBankDetails);
};

const fetchMeWatcherSaga = function* fetchMeWatcherSaga() {
  yield takeLatest(types.GET_ME, fetchMe);
}

export default [
  updateProfileInformationWatcherSaga(),
  updatePasswordWatcherSaga(),
  setTenantLookingForWatcherSaga(),
  setUserBankDetailsWatcherSaga(),
  fetchMeWatcherSaga(),
];
