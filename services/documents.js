import axios from 'axios';
import { HEADER_MULTIPART_FORM_DATA } from './index';

export const service = {
  downloadCopyId: async () => axios.get('/documents/copy-id'),
  downloadProofOfIncome: async () => axios.get('/documents/proof-of-income'),
  downloadProofOfEnrollment: async () => axios.get('/documents/proof-of-enrollment'),
  downloadProfilePhoto: async () => axios.get('/documents/profile-image', { responseType: 'blob' }),

  uploadCopyId: async (body) => axios.post('/documents/copy-id', body, HEADER_MULTIPART_FORM_DATA),
  uploadProofOfIncome: async (body) => axios.post('/documents/proof-of-income', body, HEADER_MULTIPART_FORM_DATA),
  uploadProofOfEnrollment: async (body) => axios.post('/documents/proof-of-enrollment', body, HEADER_MULTIPART_FORM_DATA),
  uploadProfilePhoto: async (body) => axios.post('/documents/profile-image', body, HEADER_MULTIPART_FORM_DATA),
};
