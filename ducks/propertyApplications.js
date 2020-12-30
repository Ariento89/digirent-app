import { createAction } from 'redux-actions';

export const key = 'PROPERTY_APPLICATIONS';

export const types = {
  FETCH_APPLICATIONS_FOR_PROPERTIES: `${key}/FETCH_APPLICATIONS_FOR_PROPERTIES`,
  APPLY: `${key}/APPLY`,
  REJECT_APPLICATION: `${key}/REJECT_APPLICATION`,
  CONSIDER_APPLICATION: `${key}/CONSIDER_APPLICATION`,
  PROCESS_APPLICATION: `${key}/PROCESS_APPLICATION`,
  LANDLORD_PROVIDE_KEYS_TO_TENANT: `${key}/LANDLORD_PROVIDE_KEYS_TO_TENANT`,
  TENANT_RECEIVED_KEYS: `${key}/TENANT_RECEIVED_KEYS`,
  FETCH_TENANT_APPLICATIONS: `${key}/FETCH_TENANT_APPLICATIONS`,
};

export const actions = {
  fetchApplicationsForProperties: createAction(types.FETCH_APPLICATIONS_FOR_PROPERTIES),
  apply: createAction(types.APPLY),
  rejectApplication: createAction(types.REJECT_APPLICATION),
  considerApplication: createAction(types.CONSIDER_APPLICATION),
  processApplication: createAction(types.PROCESS_APPLICATION),
  landlordProvideKeysToTenant: createAction(types.LANDLORD_PROVIDE_KEYS_TO_TENANT),
  tenantReceivedKeys: createAction(types.TENANT_RECEIVED_KEYS),
  fetchTenantApplications: createAction(types.FETCH_TENANT_APPLICATIONS),
};
