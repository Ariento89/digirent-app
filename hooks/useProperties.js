import { actions, types } from 'ducks/properties';
import { useState } from 'react';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useProperties = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState(null);

  // ACTIONS
  const fetchPropertiesAction = useActionDispatch(actions.fetchProperties);
  const createPropertyAction = useActionDispatch(actions.createProperty);
  const getPropertyAction = useActionDispatch(actions.getProperty);
  const updatePropertyAction = useActionDispatch(actions.updateProperty);
  const uploadImageAction = useActionDispatch(actions.uploadImage);
  const uploadVideosAction = useActionDispatch(actions.uploadVideos);
  const deletePropertyAction = useActionDispatch(actions.deleteProperty);
  const postFavoritePropertyAction = useActionDispatch(actions.postFavoriteProperty);
  const deleteFavoritePropertyAction = useActionDispatch(actions.deleteFavoriteProperty);

  // GENERAL METHODS
  const resetError = () => setErrors([]);

  const resetStatus = () => setStatus(request.NONE);

  const reset = () => {
    resetError();
    resetStatus();
  };

  const requestCallback = ({ status: requestStatus, errors: requestErrors = [] }) => {
    setStatus(requestStatus);
    setErrors(requestErrors);
  };

  const executeRequest = (data, callback, action, type) => {
    setRecentRequest(type);
    action({
      ...data,
      callback: onCallback(requestCallback, callback?.onSuccess, callback?.onError),
    });
  };

  // REQUEST METHODS
  const fetchProperties = (data, callback = {}) => {
    executeRequest(data, callback, fetchPropertiesAction, types.FETCH_PROPERTIES);
  };

  const createProperty = (data, callback = {}) => {
    executeRequest(data, callback, createPropertyAction, types.CREATE_PROPERTY);
  };

  const getProperty = (data, callback = {}) => {
    executeRequest(data, callback, getPropertyAction, types.GET_PROPERTY);
  };

  const updateProperty = (data, callback = {}) => {
    executeRequest(data, callback, updatePropertyAction, types.UPDATE_PROPERTY);
  };

  const uploadImage = (data, callback = {}) => {
    executeRequest(data, callback, uploadImageAction, types.UPLOAD_IMAGE);
  };

  const uploadVideos = (data, callback = {}) => {
    executeRequest(data, callback, uploadVideosAction, types.UPLOAD_VIDEOS);
  };

  const deleteProperty = (data, callback = {}) => {
    executeRequest(data, callback, deletePropertyAction, types.DELETE_PROPERTY);
  };

  const postFavoriteProperty = (data, callback = {}) => {
    executeRequest(data, callback, postFavoritePropertyAction, types.POST_FAVORITE_PROPERTY);
  }

  const deleteFavoriteProperty = (data, callback = {}) => {
    executeRequest(data, callback, deleteFavoritePropertyAction, types.DELETE_FAVORITE_PROPERTY);
  }

  return {
    fetchProperties,
    createProperty,
    getProperty,
    updateProperty,
    uploadImage,
    uploadVideos,
    deleteProperty,
    postFavoriteProperty,
    deleteFavoriteProperty,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
