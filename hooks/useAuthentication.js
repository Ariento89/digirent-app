import { actions, selectors, types } from 'ducks/authentication';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useAuthentication = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState();

  // SELECTORS
  const accessToken = useSelector(selectors.selectAccessToken);

  // ACTIONS
  const loginAction = useActionDispatch(actions.login);

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
  const login = (data, callback = {}) => {
    executeRequest(data, callback, loginAction, types.LOGIN);
  };

  return {
    accessToken,
    login,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
