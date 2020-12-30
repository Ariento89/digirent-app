import axios from 'axios';

export const service = {
  signRequestContractCallback: async (body) => axios.post('/applications/contract', body),

  fetchApplicationsForProperties: async (propertyId) => axios.get(`/applications/${propertyId}`),
  apply: async (propertyId) => axios.post(`/applications/${propertyId}`),
  rejectApplication: async (applicationId) => axios.post(`/applications/${applicationId}/reject`),
  considerApplication: async (applicationId) => axios.post(`/applications/${applicationId}/consider`),
  processApplication: async (applicationId) => axios.post(`/applications/${applicationId}/process`),
  landlordProvideKeysToTenant: async (applicationId) => axios.post(`/applications/${applicationId}/keys/provided`),
  tenantReceivedKeys: async (applicationId) => axios.post(`/applications/${applicationId}/keys/received`),
  fetchTenantApplications: async () => axios.get('/applications/'),
};
