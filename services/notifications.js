import axios from 'axios';

export const service = {
  fetchNotifications: async (params) => axios.get('/notifications?page=1&page_size=100'),
};
