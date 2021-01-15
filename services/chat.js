import axios from 'axios';

export const service = {
  fetchUsersChatList: async (params) => axios.get('/chat/users', { params }),
  fetchChatMessages: async (userId, params) => axios.get(`/chat/${userId}`, { params }),
  fetchChatMessagesBetweenUsers: async (params) => axios.get('/chat/', { params }),
};
