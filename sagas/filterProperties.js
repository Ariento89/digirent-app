import { types } from 'ducks/filters';
import { call, takeLatest, takeEvery } from 'redux-saga/effects';
import { service } from 'services/filterProperties';
import { request } from 'shared/types';

/* WORKERS */
function* byAvailableFrom({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.byAvailableFrom, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* byAvailableTo({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.byAvailableTo, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* byHouseType({ payload }) {
  const { callback, propertyId } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.byHouseType, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* byAmenities({ payload }) {
  const { callback, propertyId, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.byAmenities, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* byMinPrice({ payload }) {
    const { callback, propertyId } = payload;
    callback({ status: request.REQUESTING });
  
    try {
      const response = yield call(service.byMinPrice, data);
      callback({ status: request.SUCCESS, response: response.data });
    } catch (e) {
      callback({ status: request.ERROR, errors: e.errors });
    }
  }

  function* byMaxPrice({ payload }) {
    const { callback, propertyId } = payload;
    callback({ status: request.REQUESTING });
  
    try {
      const response = yield call(service.byMaxPrice, data);
      callback({ status: request.SUCCESS, response: response.data });
    } catch (e) {
      callback({ status: request.ERROR, errors: e.errors });
    }
  }

  function* byLocation({ payload }) {
    const { callback, propertyId } = payload;
    callback({ status: request.REQUESTING });
  
    try {
      const response = yield call(service.byLocation, data);
      callback({ status: request.SUCCESS, response: response.data });
    } catch (e) {
      callback({ status: request.ERROR, errors: e.errors });
    }
  }

  function* byBathrooms({ payload }) {
    const { callback, propertyId } = payload;
    callback({ status: request.REQUESTING });
  
    try {
      const response = yield call(service.byBathrooms, data);
      callback({ status: request.SUCCESS, response: response.data });
    } catch (e) {
      callback({ status: request.ERROR, errors: e.errors });
    }
  }

  function* byBedrooms({ payload }) {
    const { callback, propertyId } = payload;
    callback({ status: request.REQUESTING });
  
    try {
      const response = yield call(service.byBedrooms, data);
      callback({ status: request.SUCCESS, response: response.data });
    } catch (e) {
      callback({ status: request.ERROR, errors: e.errors });
    }
  }

  function* byFurnishing({ payload }) {
    const { callback, propertyId } = payload;
    callback({ status: request.REQUESTING });
  
    try {
      const response = yield call(service.byFurnishing, data);
      callback({ status: request.SUCCESS, response: response.data });
    } catch (e) {
      callback({ status: request.ERROR, errors: e.errors });
    }
  }

  function* byMinSqft({ payload }) {
    const { callback, propertyId } = payload;
    callback({ status: request.REQUESTING });
  
    try {
      const response = yield call(service.byMinSqft, data);
      callback({ status: request.SUCCESS, response: response.data });
    } catch (e) {
      callback({ status: request.ERROR, errors: e.errors });
    }
  }

  function* byMaxSqft({ payload }) {
    const { callback, propertyId } = payload;
    callback({ status: request.REQUESTING });
  
    try {
      const response = yield call(service.byMaxSqft, data);
      callback({ status: request.SUCCESS, response: response.data });
    } catch (e) {
      callback({ status: request.ERROR, errors: e.errors });
    }
  }

/* WATCHERS */
const byAvailableFromWatcherSaga = function* byAvailableFromWatcherSaga() {
  yield takeLatest(types.FILTER_BY_AVAILABLE_FROM, byAvailableFrom);
};

const byAvailableToWatcherSaga = function* byAvailableToWatcherSaga() {
  yield takeLatest(types.FILTER_BY_AVAILABLE_TO, byAvailableTo);
};

const byHouseTypeWatcherSaga = function* byHouseTypeWatcherSaga() {
  yield takeLatest(types.FILTER_BY_HOUSE_TYPE, byHouseType);
};

const byLocationWatcherSaga = function* byLocationWatcherSaga() {
    yield takeLatest(types.FILTER_BY_LOCATION, byLocation);
  };
  
  const byAmenitiesWatcherSaga = function* byAmenitiesWatcherSaga() {
    yield takeLatest(types.FILTER_BY_AMENITIES, byAmenities);
  };
  
  const byMinPriceWatcherSaga = function* byMinPriceWatcherSaga() {
    yield takeLatest(types.FILTER_BY_MIN_PRICE, byMinPrice);
  };

  const byMaxPriceWatcherSaga = function* byMaxPriceWatcherSaga() {
    yield takeLatest(types.FILTER_BY_MAX_PRICE, byMaxPrice);
  };
  
  const byBathroomsWatcherSaga = function* byBathroomsWatcherSaga() {
    yield takeLatest(types.FILTER_BY_BATHROOMS, byBathrooms);
  };
  
const byBedroomsWatcherSaga = function* byBedroomsWatcherSaga() {
  yield takeLatest(types.FILTER_BY_BEDROOMS, byBedrooms);
};

const byFurnishingWatcherSaga = function* byFurnishingWatcherSaga() {
  yield takeEvery(types.FILTER_BY_FURNISHING, byFurnishing);
};

const byMinSqftWatcherSaga = function* byMinSqftWatcherSaga() {
  yield takeLatest(types.FILTER_BY_MINSQFT, byMinSqft);
};

const byMaxSqftWatcherSaga = function* byMaxSqftWatcherSaga() {
  yield takeLatest(types.FILTER_BY_MAXSQFT, byMaxSqft);
};

export default [
  byAvailableFromWatcherSaga(),
  byAvailableToWatcherSaga(),
  byHouseTypeWatcherSaga(),
  byLocationWatcherSaga(),
  byAmenitiesWatcherSaga(),
  byMinPriceWatcherSaga(),
  byMaxPriceWatcherSaga(),
  byBathroomsWatcherSaga(),
  byBedroomsWatcherSaga(),
  byFurnishingWatcherSaga(),
  byMinSqftWatcherSaga(),
  byMaxSqftWatcherSaga(),
];
