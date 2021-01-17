import { types } from 'ducks/blog';
import { call, takeLatest } from 'redux-saga/effects';
import { service } from 'services/blog';
import { request } from 'shared/types';

/* WORKERS */
function* fetchBlogPosts({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchBlogPosts, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* createBlogPost({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.createBlogPost, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* getBlogPost({ payload }) {
  const { callback, id } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.getBlogPost, id);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* updateBlogPost({ payload }) {
  const { callback, id, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.updateBlogPost, id, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* fetchBlogTags({ payload }) {
  const { callback } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchBlogTags);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const fetchBlogPostsWatcherSaga = function* fetchBlogPostsWatcherSaga() {
  yield takeLatest(types.FETCH_BLOG_POSTS, fetchBlogPosts);
};

const createBlogPostWatcherSaga = function* createBlogPostWatcherSaga() {
  yield takeLatest(types.CREATE_BLOG_POST, createBlogPost);
};

const getBlogPostWatcherSaga = function* getBlogPostWatcherSaga() {
  yield takeLatest(types.GET_BLOG_POST, getBlogPost);
};

const updateBlogPostWatcherSaga = function* updateBlogPostWatcherSaga() {
  yield takeLatest(types.UPDATE_BLOG_POST, updateBlogPost);
};

const fetchBlogTagsWatcherSaga = function* fetchBlogTagsWatcherSaga() {
  yield takeLatest(types.FETCH_BLOG_TAGS, fetchBlogTags);
};

export default [
  fetchBlogPostsWatcherSaga(),
  createBlogPostWatcherSaga(),
  getBlogPostWatcherSaga(),
  updateBlogPostWatcherSaga(),
  fetchBlogTagsWatcherSaga(),
];
