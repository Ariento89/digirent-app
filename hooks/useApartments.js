import { actions, types } from 'ducks/apartments';
import { useState } from 'react';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useApartments = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState();

  // ACTIONS
  const fetchApartmentsAction = useActionDispatch(actions.fetchApartments);
  const createApartmentAction = useActionDispatch(actions.createApartment);
  const getApartmentAction = useActionDispatch(actions.getApartment);
  const updateApartmentAction = useActionDispatch(actions.updateApartment);
  const uploadImageAction = useActionDispatch(actions.uploadImage);
  const uploadVideosAction = useActionDispatch(actions.uploadVideos);

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
  const fetchApartments = (data, callback = {}) => {
    executeRequest(data, callback, fetchApartmentsAction, types.FETCH_APARTMENTS);
  };

  const createApartment = (data, callback = {}) => {
    executeRequest(data, callback, createApartmentAction, types.CREATE_APARTMENT);
  };

  const getApartment = (data, callback = {}) => {
    executeRequest(data, callback, getApartmentAction, types.GET_APARTMENT);
  };

  const updateApartment = (data, callback = {}) => {
    executeRequest(data, callback, updateApartmentAction, types.UPDATE_APARTMENT);
  };

  const uploadImage = (data, callback = {}) => {
    executeRequest(data, callback, uploadImageAction, types.UPLOAD_IMAGE);
  };

  const uploadVideos = (data, callback = {}) => {
    executeRequest(data, callback, uploadVideosAction, types.UPLOAD_VIDEOS);
  };

  return {
    fetchApartments,
    createApartment,
    getApartment,
    updateApartment,
    uploadImage,
    uploadVideos,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
