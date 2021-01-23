import { types } from 'ducks/properties';
import { call, takeLatest, takeEvery } from 'redux-saga/effects';
import { service } from 'services/properties';
import { request } from 'shared/types';

/* WORKERS */
function* fetchProperties({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchProperties, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* createProperty({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.createProperty, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* getProperty({ payload }) {
  const { callback, propertyId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.getProperty, propertyId);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* updateProperty({ payload }) {
  const { callback, propertyId, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.updateProperty, propertyId, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* uploadImage({ payload }) {
  const { callback, propertyId, image } = payload;
  callback({ status: request.REQUESTING });

  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = yield call(service.uploadImage, propertyId, formData);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* uploadVideos({ payload }) {
  const { callback, propertyId, file } = payload;
  callback({ status: request.REQUESTING });

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = yield call(service.uploadVideos, propertyId, formData);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const fetchPropertiesWatcherSaga = function* fetchPropertiesWatcherSaga() {
  yield takeLatest(types.FETCH_PROPERTIES, fetchProperties);
};

const createPropertyWatcherSaga = function* createPropertyWatcherSaga() {
  yield takeLatest(types.CREATE_PROPERTY, createProperty);
};

const getPropertyWatcherSaga = function* getPropertyWatcherSaga() {
  yield takeLatest(types.GET_PROPERTY, getProperty);
};

const updatePropertyWatcherSaga = function* updatePropertyWatcherSaga() {
  yield takeLatest(types.UPDATE_PROPERTY, updateProperty);
};

const uploadImageWatcherSaga = function* uploadImageWatcherSaga() {
  yield takeEvery(types.UPLOAD_IMAGE, uploadImage);
};

const uploadVideosWatcherSaga = function* uploadVideosWatcherSaga() {
  yield takeLatest(types.UPLOAD_VIDEOS, uploadVideos);
};

export default [
  fetchPropertiesWatcherSaga(),
  createPropertyWatcherSaga(),
  getPropertyWatcherSaga(),
  updatePropertyWatcherSaga(),
  uploadImageWatcherSaga(),
  uploadVideosWatcherSaga(),
];
