import { request } from './types';

// UI FUNCTIONS
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const findOptions = (value, options) => options?.find((option) => option.value === value);

export const getDistance = (rect1, rect2) => {
  const halfHeight = rect1.height / 2;
  const y1 = rect1.top + halfHeight;
  const y2 = rect2.top + halfHeight;

  return Math.abs(y1 - y2) - rect1.height * 0.3;
};

export const showMessage = (status, successMessage, errorMessage) => {
  if (status === request.SUCCESS) {
    // eslint-disable-next-line no-console
    console.log('SUCCESS: ', successMessage);
  } else if (status === request.ERROR) {
    // eslint-disable-next-line no-console
    console.error('ERROR: ', errorMessage);
  }
};

// SERVICE FUNCTIONS
export const modifiedCallback = (callback, successMessage, errorMessage, extraCallback = null) => (
  response,
) => {
  showMessage(response?.status, successMessage, errorMessage);
  callback(response);
  if (extraCallback) {
    extraCallback(response);
  }
};

export const onCallback = (callback, onSuccess = null, onError = null) => (response) => {
  callback(response);

  console.log('response', response);

  if (onSuccess && response?.status === request.SUCCESS) {
    onSuccess(response);
  }

  if (onError && response?.status === request.ERROR) {
    onError(response);
  }
};
