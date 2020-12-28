import { actions, types } from 'ducks/amenities';
import { useState } from 'react';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useAmenities = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState();

  // ACTIONS
  const fetchAmenitiesAction = useActionDispatch(actions.fetchAmenities);
  const createAmenityAction = useActionDispatch(actions.createAmenity);

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
  const fetchAmenities = (callback = {}) => {
    executeRequest({}, callback, fetchAmenitiesAction, types.FETCH_AMENITIES);
  };

  const createAmenity = (data, callback = {}) => {
    executeRequest(data, callback, createAmenityAction, types.CREATE_AMENITY);
  };

  return {
    fetchAmenities,
    createAmenity,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
