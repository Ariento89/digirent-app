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
  const [recentRequest, setRecentRequest] = useState(null);

  // SELECTORS
  const accessToken = useSelector(selectors.selectAccessToken());
  const sessionTimedOut = useSelector(selectors.selectSessionTimedOut());

  // ACTIONS
  const loginAction = useActionDispatch(actions.login);
  const loginGoogleAction = useActionDispatch(actions.loginGoogle);
  const loginFacebookAction = useActionDispatch(actions.loginFacebook);
  const loginAppleAction = useActionDispatch(actions.loginApple)
  const logout = useActionDispatch(actions.logout);
  const clearSessionTimeOut = useActionDispatch(actions.clearSessionTimeOut);

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

  const loginGoogle =  (data, callback = {}) => {
    executeRequest(data, callback, loginGoogleAction, types.LOGIN_GOOGLE);
  };

  const loginFacebook = (data, callback = {}) => {
    executeRequest(data, callback, loginFacebookAction, types.LOGIN_FACEBOOK)
  }

  const loginApple = (data, callback = {}) => {
    executeRequest(data, callback, loginAppleAction, types.LOGIN_APPLE)
  }

  return {
    accessToken,
    sessionTimedOut,
    login,
    loginGoogle,
    loginFacebook,
    loginApple,
    logout,
    clearSessionTimeOut,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
