import axios from 'axios';
import { HEADER_MULTIPART_FORM_DATA, NO_VERIFICATION_CONFIG } from './index';

export const service = {
  me: async () => axios.get('/me'),
  me2: async (accessToken) => axios.get('/me', { headers: { authorization: `Bearer ${accessToken}` }, ...NO_VERIFICATION_CONFIG }),
  fetchMyPropertyApplications: async () => axios.get('/me/applciations'), // TODO: Tell Shai to fix spelling

  updateProfileInformation: async (body) => axios.put('/me/', body),

  setTenantLookingFor: async (body) => axios.post('/me/looking-for', body),
  setUserBankDetails: async (body) => axios.post('/me/bank', body),

  updatePassword: async (body) => axios.put('/me/password', body),
};
