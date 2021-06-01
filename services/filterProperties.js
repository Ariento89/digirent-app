import axios from 'axios';

export const service = {
  byAvailableFrom: async (params) => axios.get('/apartments/', { params }),
  byAvailableTo: async (params) => axios.get('/apartments/', { params }),
  byHouseType: async (params) => axios.post('/apartments/', { params }),
  byLocation: async (params) => axios.get('/apartments/', { params }),
  byAmenities: async (params) => axios.put('/apartments/', { params }),
  byMinPrice: async (params) => axios.put('/apartments/', { params }),
  byMaxPrice: async (params) => axios.put('/apartments/', { params }),
  byBathrooms: async (params) => axios.post('/apartments/', { params }),
  byBedrooms: async (params) => axios.post('/apartments/', { params }),
  byFurnishing: async (params) => axios.post('/apartments/', { params }),
  byMinSqft: async (params) => axios.post('/apartments/', { params }),
  byMaxSqft: async (params) => axios.post('/apartments/', { params })
};
