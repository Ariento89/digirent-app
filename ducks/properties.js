import { createAction } from 'redux-actions';

export const key = 'PROPERTIES';

export const types = {
  FETCH_PROPERTIES: `${key}/FETCH_PROPERTIES`,
  CREATE_PROPERTY: `${key}/CREATE_PROPERTY`,
  GET_PROPERTY: `${key}/GET_PROPERTY`,
  UPDATE_PROPERTY: `${key}/UPDATE_PROPERTY`,
  UPLOAD_IMAGE: `${key}/UPLOAD_IMAGE`,
  UPLOAD_VIDEOS: `${key}/UPLOAD_VIDEOS`,
  DELETE_PROPERTY: `${key}/DELETE_PROPERTY`,
};

export const actions = {
  fetchProperties: createAction(types.FETCH_PROPERTIES),
  createProperty: createAction(types.CREATE_PROPERTY),
  getProperty: createAction(types.GET_PROPERTY),
  updateProperty: createAction(types.UPDATE_PROPERTY),
  uploadImage: createAction(types.UPLOAD_IMAGE),
  uploadVideos: createAction(types.UPLOAD_VIDEOS),
  deleteProperty: createAction(types.DELETE_PROPERTY),
};
