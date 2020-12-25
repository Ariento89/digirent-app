import axios from 'axios';
import qs from 'qs';
import { HEADER_MULTIPART_FORM_DATA } from './index';

export const service = {
  me: async () => axios.get('/me'),
  updateProfileInformation: async (body) => axios.put('/me/', body),

  setTenantLookingFor: async (body) => axios.post('/me/looking-for', body),
  setUserBankDetails: async (body) => axios.post('/me/bank', body),

  updatePassword: async (body) => axios.put('/me/password', body),

  uploadCopyId: async (body) => axios.post('/me/upload/copy-id', body, HEADER_MULTIPART_FORM_DATA),
  uploadProofOfIncome: async (body) => axios.post('/me/upload/proof-of-income', body, HEADER_MULTIPART_FORM_DATA),
  uploadProofOfEnrollment: async (body) => axios.post('/me/upload/proof-of-enrollment', body, HEADER_MULTIPART_FORM_DATA),
  uploadProfilePhoto: async (body) => axios.post('/me/upload/profile-image', body, HEADER_MULTIPART_FORM_DATA),

  fetchMyApartmentApplications: async () => axios.get('/me/applciations'), // TODO: Tell Shai to fix spelling
};
