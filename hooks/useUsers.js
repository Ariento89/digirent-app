import { actions, types } from 'ducks/users';
import { useState } from 'react';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useUsers = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState(null);

  // ACTIONS
  const registerTenantAction = useActionDispatch(actions.registerTenant);
  const registerLandlordAction = useActionDispatch(actions.registerLandlord);
  const fetchAllUsersAction = useActionDispatch(actions.fetchAllUsers);
  const fetchAllLandlordsAction = useActionDispatch(actions.fetchAllLandlords);
  const fetchAllTenantsAction = useActionDispatch(actions.fetchAllTenants);
  const verifyEmailAction = useActionDispatch(actions.verifyEmail);

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
  const registerLandlord = (data, callback = {}) => {
    executeRequest(data, callback, registerLandlordAction, types.REGISTER_LANDLORD);
  };

  const registerTenant = (data, callback = {}) => {
    executeRequest(data, callback, registerTenantAction, types.REGISTER_TENANT);
  };

  const fetchAllUsers = (data, callback = {}) => {
    executeRequest(data, callback, fetchAllUsersAction, types.FETCH_ALL_USERS);
  };

  const fetchAllLandlords = (data, callback = {}) => {
    executeRequest(data, callback, fetchAllLandlordsAction, types.FETCH_ALL_LANDLORDS);
  };

  const fetchAllTenants = (data, callback = {}) => {
    executeRequest(data, callback, fetchAllTenantsAction, types.FETCH_ALL_TENANTS);
  };

  const verifyEmail = (data, callback = {}) => {
    executeRequest(data, callback, verifyEmailAction, types.VERIFY_EMAIL);
  };

  return {
    registerLandlord,
    registerTenant,
    fetchAllUsers,
    fetchAllLandlords,
    fetchAllTenants,
    verifyEmail,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
