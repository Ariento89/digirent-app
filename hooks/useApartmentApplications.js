import { actions, types } from 'ducks/apartmentApplications';
import { useState } from 'react';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useApartmentApplications = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState();

  // ACTIONS
  const fetchApplicationsForApartmentsAction = useActionDispatch(
    actions.fetchApplicationsForApartments,
  );
  const applyAction = useActionDispatch(actions.apply);
  const rejectApplicationAction = useActionDispatch(actions.rejectApplication);
  const considerApplicationAction = useActionDispatch(actions.considerApplication);
  const processApplicationAction = useActionDispatch(actions.processApplication);
  const landlordProvideKeysToTenantAction = useActionDispatch(actions.landlordProvideKeysToTenant);
  const tenantReceivedKeysAction = useActionDispatch(actions.tenantReceivedKeys);
  const fetchTenantApplicationsAction = useActionDispatch(actions.fetchTenantApplications);

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
  const fetchApplicationsForApartments = (data, callback = {}) => {
    executeRequest(
      data,
      callback,
      fetchApplicationsForApartmentsAction,
      types.FETCH_APPLICATIONS_FOR_APARTMENTS,
    );
  };

  const apply = (data, callback = {}) => {
    executeRequest(data, callback, applyAction, types.APPLY);
  };

  const rejectApplication = (data, callback = {}) => {
    executeRequest(data, callback, rejectApplicationAction, types.REJECT_APPLICATION);
  };

  const considerApplication = (data, callback = {}) => {
    executeRequest(data, callback, considerApplicationAction, types.CONSIDER_APPLICATION);
  };

  const processApplication = (data, callback = {}) => {
    executeRequest(data, callback, processApplicationAction, types.PROCESS_APPLICATION);
  };

  const landlordProvideKeysToTenant = (data, callback = {}) => {
    executeRequest(
      data,
      callback,
      landlordProvideKeysToTenantAction,
      types.LANDLORD_PROVIDE_KEYS_TO_TENANT,
    );
  };

  const tenantReceivedKeys = (data, callback = {}) => {
    executeRequest(data, callback, tenantReceivedKeysAction, types.TENANT_RECEIVED_KEYS);
  };

  const fetchTenantApplications = (data, callback = {}) => {
    executeRequest(data, callback, fetchTenantApplicationsAction, types.FETCH_TENANT_APPLICATIONS);
  };

  return {
    fetchApplicationsForApartments,
    apply,
    rejectApplication,
    considerApplication,
    processApplication,
    landlordProvideKeysToTenant,
    tenantReceivedKeys,
    fetchTenantApplications,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
