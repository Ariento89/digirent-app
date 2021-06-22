import axios from 'axios';
import { HEADER_MULTIPART_FORM_DATA } from './index';

export const service = {
  fetchProperties: async (params) => axios.get('/apartments/', { params }),
  fetchPropertiesTenant: async (params) => axios.get('/apartments/tenant', { params }),
  createProperty: async (body) => axios.post('/apartments/', body),
  deleteProperty: async (propertyId) => axios.put(`/apartments/${propertyId}/archive`),
  getProperty: async (propertyId) => axios.get(`/apartments/${propertyId}`),
  updateProperty: async (propertyId, body) => axios.put(`/apartments/${propertyId}`, body),
  uploadImage: async (propertyId, body) => axios.post(`/apartments/${propertyId}/images`, body, HEADER_MULTIPART_FORM_DATA),
  uploadVideos: async (propertyId, body) => axios.post(`/apartments/${propertyId}/videos`, body, HEADER_MULTIPART_FORM_DATA),
  postFavoriteProperty: async (propertyId) => axios.post(`/apartments/${propertyId}/favorites`),
  deleteFavoriteProperty: async (propertyId) => axios.delete(`/apartments/${propertyId}/favorites`),
};
