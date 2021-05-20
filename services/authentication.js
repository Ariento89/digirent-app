import axios from 'axios';
import qs from 'qs';
import { NO_VERIFICATION_CONFIG } from 'services';

export const service = {
  login: async (body) => axios.post('/auth/', qs.stringify(body), NO_VERIFICATION_CONFIG),
  forgotPassword: async (body) => axios.post('/auth/forgot-password/', body),
  resetPassword: async (body) => axios.post('/auth/reset-password/', body),

  googleAuth: async (who) => axios.post(`/auth/google`, null, {withCredentials: true, noAuth: true, params: {who}}),
  facebookAuth: async (who) => axios.post(`/auth/facebook`, null, {withCredentials: true, noAuth:true, params:{who}}),
  appleAuth: async (who) => axios.post(`/auth/apple`, null, {withCredentials: true, noAuth:true, params:{who}}),

  googleAuthorization: async (params) => axios.post('/auth/authorization/google', null, { params, noAuth: true, withCredentials: true }),
  facebookAuthorization: async (params) => axios.post('/auth/authorization/facebook/', null, { params, noAuth: true, withCredentials: true }),
  appleAuthorization: async (params) => axios.post('/auth/authorization/apple/', null, {params, noAuth: true, withCredentials: true})
};
