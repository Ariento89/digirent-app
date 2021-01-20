import { actions, types } from 'ducks/blog';
import { useState } from 'react';
import { onCallback } from 'shared/functions';
import { request } from 'shared/types';
import { useActionDispatch } from './useActionDispatch';

export const useBlog = () => {
  // STATES
  const [status, setStatus] = useState(request.NONE);
  const [errors, setErrors] = useState([]);
  const [recentRequest, setRecentRequest] = useState(null);

  // ACTIONS
  const fetchBlogPostsAction = useActionDispatch(actions.fetchBlogPosts);
  const createBlogPostAction = useActionDispatch(actions.createBlogPost);
  const getBlogPostAction = useActionDispatch(actions.getBlogPost);
  const updateBlogPostAction = useActionDispatch(actions.updateBlogPost);
  const fetchBlogTagsAction = useActionDispatch(actions.fetchBlogTags);

  // GENERAL METHODS
  const resetError = () => setErrors([]);

  const resetStatus = () => setStatus(request.NONE);

  const reset = () => {
    resetError();
    resetStatus();
  };

  const requestCallback = ({ status: requestStatus, errors: requestErrors = [] }) => {
    setStatus(requestStatus);
    setErrors(requestErrors);
  };

  const executeRequest = (data, callback, action, type) => {
    setRecentRequest(type);
    action({
      ...data,
      callback: onCallback(requestCallback, callback?.onSuccess, callback?.onError),
    });
  };

  // REQUEST METHODS
  const fetchBlogPosts = (data, callback = {}) => {
    executeRequest(data, callback, fetchBlogPostsAction, types.FETCH_BLOG_POSTS);
  };

  const createBlogPost = (data, callback = {}) => {
    executeRequest(data, callback, createBlogPostAction, types.CREATE_BLOG_POST);
  };

  const getBlogPost = (data, callback = {}) => {
    executeRequest(data, callback, getBlogPostAction, types.GET_BLOG_POST);
  };

  const updateBlogPost = (data, callback = {}) => {
    executeRequest(data, callback, updateBlogPostAction, types.UPDATE_BLOG_POST);
  };

  const fetchBlogTags = (callback = {}) => {
    executeRequest({}, callback, fetchBlogTagsAction, types.FETCH_BLOG_TAGS);
  };

  return {
    fetchBlogPosts,
    createBlogPost,
    getBlogPost,
    updateBlogPost,
    fetchBlogTags,
    status,
    errors,
    recentRequest,
    reset,
    resetStatus,
    resetError,
  };
};
