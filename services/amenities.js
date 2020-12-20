import axios from 'axios';

export const service = {
  fetchAmenities: async () => axios.get('/amenities/'),
  createAmenity: async (body) => axios.post('/amenities/', body),
};
