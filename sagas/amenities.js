import { types } from 'ducks/amenities';
import { call, takeLatest } from 'redux-saga/effects';
import { service } from 'services/amenities';
import { request } from 'shared/types';

/* WORKERS */
function* fetchAmenities({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchAmenities, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* createAmenity({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.createAmenity, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const fetchAmenitiesWatcherSaga = function* fetchAmenitiesWatcherSaga() {
  yield takeLatest(types.FETCH_AMENITIES, fetchAmenities);
};

const createAmenityWatcherSaga = function* createAmenityWatcherSaga() {
  yield takeLatest(types.CREATE_AMENITY, createAmenity);
};

export default [fetchAmenitiesWatcherSaga(), createAmenityWatcherSaga()];
