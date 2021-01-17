import { createAction } from 'redux-actions';

export const key = 'BLOG';

export const types = {
  FETCH_BLOG_POSTS: `${key}/FETCH_BLOG_POSTS`,
  CREATE_BLOG_POST: `${key}/CREATE_BLOG_POST`,
  GET_BLOG_POST: `${key}/GET_BLOG_POST`,
  UPDATE_BLOG_POST: `${key}/UPDATE_BLOG_POST`,
  FETCH_BLOG_TAGS: `${key}/FETCH_BLOG_TAGS`,
};

export const actions = {
  fetchBlogPosts: createAction(types.FETCH_BLOG_POSTS),
  createBlogPost: createAction(types.CREATE_BLOG_POST),
  getBlogPost: createAction(types.GET_BLOG_POST),
  updateBlogPost: createAction(types.UPDATE_BLOG_POST),
  fetchBlogTags: createAction(types.FETCH_BLOG_TAGS),
};
