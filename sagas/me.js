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

function* uploadCopyId({ payload }) {
  const { callback, file } = payload;
  callback({ status: request.REQUESTING });

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = yield call(service.uploadCopyId, formData);
    yield put(
      actions.save({
        type: types.UPLOAD_COPY_ID,
        me: response.data,
      }),
    );

    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* uploadProofOfIncome({ payload }) {
  const { callback, file } = payload;
  callback({ status: request.REQUESTING });

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = yield call(service.uploadProofOfIncome, formData);
    yield put(
      actions.save({
        type: types.UPLOAD_PROOF_OF_INCOME,
        me: response.data,
      }),
    );

    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* uploadProofOfEnrollment({ payload }) {
  const { callback, file } = payload;
  callback({ status: request.REQUESTING });

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = yield call(service.uploadProofOfEnrollment, formData);
    yield put(
      actions.save({
        type: types.UPLOAD_PROOF_OF_ENROLMENT,
        me: response.data,
      }),
    );

    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* uploadProfilePhoto({ payload }) {
  const { callback, file } = payload;
  callback({ status: request.REQUESTING });

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = yield call(service.uploadProfilePhoto, formData);
    yield put(
      actions.save({
        type: types.UPLOAD_PROFILE_PHOTO,
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

const uploadCopyIdWatcherSaga = function* uploadCopyIdWatcherSaga() {
  yield takeLatest(types.UPLOAD_COPY_ID, uploadCopyId);
};

const uploadProofOfIncomeWatcherSaga = function* uploadProofOfIncomeWatcherSaga() {
  yield takeLatest(types.UPLOAD_PROOF_OF_INCOME, uploadProofOfIncome);
};

const uploadProofOfEnrollmentWatcherSaga = function* uploadProofOfEnrollmentWatcherSaga() {
  yield takeLatest(types.UPLOAD_PROOF_OF_ENROLMENT, uploadProofOfEnrollment);
};

const uploadProfilePhotoWatcherSaga = function* uploadProfilePhotoWatcherSaga() {
  yield takeLatest(types.UPLOAD_PROFILE_PHOTO, uploadProfilePhoto);
};

export default [
  updateProfileInformationWatcherSaga(),
  updatePasswordWatcherSaga(),
  setTenantLookingForWatcherSaga(),
  setUserBankDetailsWatcherSaga(),
  uploadCopyIdWatcherSaga(),
  uploadProofOfIncomeWatcherSaga(),
  uploadProofOfEnrollmentWatcherSaga(),
  uploadProfilePhotoWatcherSaga(),
];
