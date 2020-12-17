import axios from 'axios';

export const service = {
  fetchApartments: async (params) => axios.get('/apartments/', { params }),
  createApartment: async (body) => axios.post('/apartments/', body),
  getApartment: async (apartmentId) => axios.get(`/apartments/${apartmentId}`),
  updateApartment: async (apartmentId, body) => axios.put(`/apartments/${apartmentId}`, body),

  uploadImage: async (apartmentId, body) => axios.post(`/apartments/${apartmentId}/images`, body),
  uploadVideos: async (apartmentId, body) => axios.post(`/apartments/${apartmentId}/videos`, body),
};
