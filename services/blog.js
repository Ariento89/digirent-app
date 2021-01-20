import axios from 'axios';

export const service = {
  fetchBlogPosts: async (params) => axios.get('/blog/posts', { params }),
  createBlogPost: async (body) => axios.post('/blog/posts', body),
  getBlogPost: async (postId) => axios.get(`/blog/posts/${postId}`),
  updateBlogPost: async (postId, body) => axios.put(`/blog/posts/${postId}`, body),
  fetchBlogTags: async () => axios.get('/blog/tags'),
};
