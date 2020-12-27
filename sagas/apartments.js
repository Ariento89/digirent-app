import { types } from 'ducks/apartments';
import { call, takeLatest } from 'redux-saga/effects';
import { service } from 'services/apartments';
import { request } from 'shared/types';

/* WORKERS */
function* fetchApartments({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchApartments, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* createApartment({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.createApartment, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* getApartment({ payload }) {
  const { callback, apartmentId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.getApartment, apartmentId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* updateApartment({ payload }) {
  const { callback, apartmentId, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.updateApartment, apartmentId, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* uploadImage({ payload }) {
  const { callback, apartmentId, file } = payload;
  callback({ status: request.REQUESTING });

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = yield call(service.uploadImage, apartmentId, formData);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* uploadVideos({ payload }) {
  const { callback, apartmentId, file } = payload;
  callback({ status: request.REQUESTING });

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = yield call(service.uploadVideos, apartmentId, formData);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const fetchApartmentsWatcherSaga = function* fetchApartmentsWatcherSaga() {
  yield takeLatest(types.FETCH_APARTMENTS, fetchApartments);
};

const createApartmentWatcherSaga = function* createApartmentWatcherSaga() {
  yield takeLatest(types.CREATE_APARTMENT, createApartment);
};

const getApartmentWatcherSaga = function* getApartmentWatcherSaga() {
  yield takeLatest(types.GET_APARTMENT, getApartment);
};

const updateApartmentWatcherSaga = function* updateApartmentWatcherSaga() {
  yield takeLatest(types.UPDATE_APARTMENT, updateApartment);
};

const uploadImageWatcherSaga = function* uploadImageWatcherSaga() {
  yield takeLatest(types.UPLOAD_IMAGE, uploadImage);
};

const uploadVideosWatcherSaga = function* uploadVideosWatcherSaga() {
  yield takeLatest(types.UPLOAD_VIDEOS, uploadVideos);
};

export default [
  fetchApartmentsWatcherSaga(),
  createApartmentWatcherSaga(),
  getApartmentWatcherSaga(),
  updateApartmentWatcherSaga(),
  uploadImageWatcherSaga(),
  uploadVideosWatcherSaga(),
];
