import axios from 'axios';

export const service = {
  signRequestContractCallback: async (body) => axios.post('/applications/contract', body),

  fetchApplicationsForApartments: async (apartmentId) => axios.get(`/applications/${apartmentId}`),
  apply: async (apartmentId) => axios.post(`/applications/${apartmentId}`),
  rejectApplication: async (applicationId) => axios.post(`/applications/${applicationId}/reject`),
  considerApplication: async (applicationId) => axios.post(`/applications/${applicationId}/consider`),
  processApplication: async (applicationId) => axios.post(`/applications/${applicationId}/process`),
  landlordProvideKeysToTenant: async (applicationId) => axios.post(`/applications/${applicationId}/keys/provided`),
  tenantReceivedKeys: async (applicationId) => axios.post(`/applications/${applicationId}/keys/received`),
  fetchTenantApplications: async () => axios.get('/applications/'),
};
