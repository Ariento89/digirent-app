import { types } from 'ducks/documents';
import { call, takeLatest } from 'redux-saga/effects';
import { service } from 'services/documents';
import { request } from 'shared/types';

/* WORKERS */
function* downloadCopyId({ payload }) {
  const { callback } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.downloadCopyId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* downloadProofOfIncome({ payload }) {
  const { callback } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.downloadProofOfIncome);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* downloadProofOfEnrollment({ payload }) {
  const { callback } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.downloadProofOfEnrollment);
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

    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const downloadCopyIdWatcherSaga = function* downloadCopyIdWatcherSaga() {
  yield takeLatest(types.DOWNLOAD_COPY_ID, downloadCopyId);
};

const downloadProofOfIncomeWatcherSaga = function* downloadProofOfIncomeWatcherSaga() {
  yield takeLatest(types.DOWNLOAD_PROOF_OF_INCOME, downloadProofOfIncome);
};

const downloadProofOfEnrollmentWatcherSaga = function* downloadProofOfEnrollmentWatcherSaga() {
  yield takeLatest(types.DOWNLOAD_PROOF_OF_ENROLMENT, downloadProofOfEnrollment);
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
  downloadCopyIdWatcherSaga(),
  downloadProofOfIncomeWatcherSaga(),
  downloadProofOfEnrollmentWatcherSaga(),
  uploadCopyIdWatcherSaga(),
  uploadProofOfIncomeWatcherSaga(),
  uploadProofOfEnrollmentWatcherSaga(),
  uploadProfilePhotoWatcherSaga(),
];
