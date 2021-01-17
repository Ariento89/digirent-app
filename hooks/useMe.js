import { actions, selectors, types } from 'ducks/me';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useMe = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState(null);

  // SELECTORS
  const me = useSelector(selectors.selectMe());

  // ACTIONS
  const getMeAction = useActionDispatch(actions.getMe);
  const updateProfileInformationAction = useActionDispatch(actions.updateProfileInformation);
  const updatePasswordAction = useActionDispatch(actions.updatePassword);
  const setTenantLookingForAction = useActionDispatch(actions.setTenantLookingFor);
  const setUserBankDetailsAction = useActionDispatch(actions.setUserBankDetails);

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
  const getMe = (data, callback = {}) => {
    executeRequest(data, callback, getMeAction, types.GET_ME);
  };

  const updateProfileInformation = (data, callback = {}) => {
    executeRequest(
      data,
      callback,
      updateProfileInformationAction,
      types.UPDATE_PROFILE_INFORMATION,
    );
  };

  const updatePassword = (data, callback = {}) => {
    executeRequest(data, callback, updatePasswordAction, types.UPDATE_PASSWORD);
  };

  const setTenantLookingFor = (data, callback = {}) => {
    executeRequest(data, callback, setTenantLookingForAction, types.SET_TENANT_LOOKING_FOR);
  };

  const setUserBankDetails = (data, callback = {}) => {
    executeRequest(data, callback, setUserBankDetailsAction, types.SET_USER_BANK_DETAILS);
  };

  return {
    me,
    updateProfileInformation,
    updatePassword,
    setTenantLookingFor,
    setUserBankDetails,
    getMe,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
