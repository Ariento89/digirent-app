import axios from 'axios';

export const service = {
  auth: async (body) => axios.post('/auth/', body),
  forgotPassword: async (body) => axios.post('/auth/forgot-password/', body),
  resetPassword: async (body) => axios.post('/auth/reset-password/', body),

  landlordGoogleAuth: async (params) => axios.get('/auth/landlord/authorization/google/', { params }),
  tenantGoogleAuth: async (params) => axios.get('/auth/tenant/authorization/google/', { params }),

  googleAuth: async (params) => axios.get('/auth/google/', { params }),
  facebookAuth: async (params) => axios.get('/auth/facebook/', { params }),

  landlordFacebookAuth: async (params) => axios.get('/auth/landlord/authorization/facebook/', { params }),
  tenantFacebookAuth: async (params) => axios.get('/auth/tenant/authorization/facebook/', { params }),
};
