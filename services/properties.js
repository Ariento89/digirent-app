import axios from 'axios';
import { HEADER_MULTIPART_FORM_DATA } from './index';

export const service = {
  fetchProperties: async (params) => axios.get('/apartments', { params }),
  createProperty: async (body) => axios.post('/apartments', body),
  getProperty: async (propertyId) => axios.get(`/apartments/${propertyId}`),
  updateProperty: async (propertyId, body) => axios.put(`/apartments/${propertyId}`, body),
  uploadImage: async (propertyId, body) => axios.post(`/apartments/${propertyId}/images`, body, HEADER_MULTIPART_FORM_DATA),
  uploadVideos: async (propertyId, body) => axios.post(`/apartments/${propertyId}/videos`, body, HEADER_MULTIPART_FORM_DATA),
};
