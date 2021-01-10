import axios from 'axios';

export const service = {
  fetchChatMessages: async (userId, params) => axios.get(`/chat/${userId}`, { params }),
  fetchChatMessagesBetweenUsers: async (params) => axios.get('/chat/', { params }),
};
