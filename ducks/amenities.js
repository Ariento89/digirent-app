import { createAction } from 'redux-actions';

export const key = 'AMENITIES';

export const types = {
  FETCH_AMENITIES: `${key}/FETCH_AMENITIES`,
  CREATE_AMENITY: `${key}/CREATE_AMENITY`,
};

export const actions = {
  fetchAmenities: createAction(types.FETCH_AMENITIES),
  createAmenity: createAction(types.CREATE_AMENITY),
};
