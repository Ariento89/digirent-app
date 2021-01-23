import axios from 'axios';
import qs from 'qs';
import { NO_VERIFICATION_CONFIG } from 'services';

export const service = {
  login: async (body) => axios.post('/auth/', qs.stringify(body), NO_VERIFICATION_CONFIG),
  forgotPassword: async (body) => axios.post('/auth/forgot-password/', body),
  resetPassword: async (body) => axios.post('/auth/reset-password/', body),

  googleAuthorization: async (params) => axios.post('/auth/authorization/google', null, { params, noAuth: true, withCredentials: true }),

  googleAuth: async (who) => axios.post(`/auth/google`, null, {withCredentials: true, noAuth: true, params: {who}}),
  facebookAuth: async (who) => axios.post(`/auth/facebook?who=${who}`, null, NO_VERIFICATION_CONFIG),

  facebookAuthorization: async (params) => axios.post('/auth/authorization/facebook/', null, { params }),
};
