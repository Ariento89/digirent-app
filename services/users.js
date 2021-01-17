import axios from 'axios';

export const service = {
  registerTenant: async (body) => axios.post('/users/tenant/', body),
  registerLandlord: async (body) => axios.post('/users/landlord/', body),

  fetchAllUsers: async () => axios.get('/users/'),
  fetchAllLandlords: async () => axios.get('/users/landlords'),
  fetchAllTenants: async () => axios.get('/users/tenants'),

  verifyEmail: async (body) => axios.post('/users/verify/', body),
};
