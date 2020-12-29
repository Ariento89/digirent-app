import axios from 'axios';
import { HEADER_MULTIPART_FORM_DATA } from './index';

export const service = {
  fetchApartments: async (params) => axios.get('/apartments/', { params }),
  createApartment: async (body) => axios.post('/apartments/', body),
  getApartment: async (apartmentId) => axios.get(`/apartments/${apartmentId}`),
  updateApartment: async (apartmentId, body) => axios.put(`/apartments/${apartmentId}`, body),
  uploadImage: async (apartmentId, body) => axios.post(`/apartments/${apartmentId}/images`, body, HEADER_MULTIPART_FORM_DATA),
  uploadVideos: async (apartmentId, body) => axios.post(`/apartments/${apartmentId}/videos`, body, HEADER_MULTIPART_FORM_DATA),
};
