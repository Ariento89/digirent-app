import { actions, types } from 'ducks/filters';
import { useState } from 'react';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useFilters = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState(null);

  // ACTIONS
  const byAvailableFromAction = useActionDispatch(actions.byAvailableFrom);
  const byAvailableToAction = useActionDispatch(actions.byAvailableTo);
  const byHouseTypeAction = useActionDispatch(actions.byHouseType);
  const byLocationAction = useActionDispatch(actions.byLocation);
  const byAmenitiesAction = useActionDispatch(actions.byAmenities);
  const byMinPriceAction = useActionDispatch(actions.byMinPrice);
  const byMaxPriceAction = useActionDispatch(actions.byMaxPrice);
  const byBathroomsAction = useActionDispatch(actions.byBathrooms);
  const byBedroomsAction = useActionDispatch(actions.byBedrooms);
  const byFurnishingAction = useActionDispatch(actions.byFurnishing);
  const byMinSqftAction = useActionDispatch(actions.byMinSqft);
  const byMaxSqftAction = useActionDispatch(actions.byMaxSqft);

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
  const byAvailableFrom = (data, callback = {}) => {
    executeRequest(data, callback, byAvailableFromAction, types.FILTER_BY_AVAILABLE_FROM);
  };

  const byAvailableTo = (data, callback = {}) => {
    executeRequest(data, callback, byAvailableToAction, types.FILTER_BY_AVAILABLE_TO);
  };

  const byHouseType = (data, callback = {}) => {
    executeRequest(data, callback, byHouseTypeAction, types.FILTER_BY_HOUSE_TYPE);
  };

  const byAmenities = (data, callback = {}) => {
    executeRequest(data, callback, byLocationAction, types.FILTER_BY_LOCATION);
  };

  const byMinPrice = (data, callback = {}) => {
    executeRequest(data, callback, byAmenitiesAction, types.FILTER_BY_AMENITIES);
  };

  const byMaxPrice = (data, callback = {}) => {
    executeRequest(data, callback, byMinPriceAction, types.FILTER_BY_MIN_PRICE);
  };

  const byLocation = (data, callback = {}) => {
    executeRequest(data, callback, byMaxPriceAction, types.FILTER_BY_MAX_PRICE)
  }

  const byBathrooms = (data, callback = {}) => {
    executeRequest(data, callback, byBathroomsAction, types.FILTER_BY_BATHROOMS);
  };

  const byBedrooms = (data, callback = {}) => {
    executeRequest(data, callback, byBedroomsAction, types.FILTER_BY_BEDROOMS);
  };

  const byFurnishing = (data, callback = {}) => {
    executeRequest(data, callback, byFurnishingAction, types.FILTER_BY_FURNISHING)
  }

  const byMinSqft = (data, callback = {}) => {
    executeRequest(data, callback, byMinSqftAction, types.FILTER_BY_MINSQFT);
  };

  const byMaxSqft = (data, callback = {}) => {
    executeRequest(data, callback, byMaxSqftAction, types.FILTER_BY_MAXSQFT);
  };


  return {
    byAvailableFrom,
    byAvailableTo,
    byHouseType,
    byAmenities,
    byMinPrice,
    byMaxPrice,
    byLocation,
    byBathrooms,
    byBedrooms,
    byFurnishing,
    byMinSqft,
    byMaxSqft,
    reset,
    resetStatus,
    resetError,
  };
};
