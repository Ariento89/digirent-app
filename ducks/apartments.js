import { createAction } from 'redux-actions';

export const key = 'APARTMENTS';

export const types = {
  FETCH_APARTMENTS: `${key}/FETCH_APARTMENTS`,
  CREATE_APARTMENT: `${key}/CREATE_APARTMENT`,
  GET_APARTMENT: `${key}/GET_APARTMENT`,
  UPDATE_APARTMENT: `${key}/UPDATE_APARTMENT`,
  UPLOAD_IMAGE: `${key}/UPLOAD_IMAGE`,
  UPLOAD_VIDEOS: `${key}/UPLOAD_VIDEOS`,
};

export const actions = {
  fetchApartments: createAction(types.FETCH_APARTMENTS),
  createApartment: createAction(types.CREATE_APARTMENT),
  getApartment: createAction(types.GET_APARTMENT),
  updateApartment: createAction(types.UPDATE_APARTMENT),
  uploadImage: createAction(types.UPLOAD_IMAGE),
  uploadVideos: createAction(types.UPLOAD_VIDEOS),
};
