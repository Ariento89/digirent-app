/* eslint-disable max-len */
import { types } from 'ducks/chat';
import { call, takeLatest } from 'redux-saga/effects';
import { service } from 'services/chat';
import { request } from 'shared/types';

/* WORKERS */
function* fetchUsersChatList({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchUsersChatList, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* fetchChatMessages({ payload }) {
  const { callback, id, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchChatMessages, id, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* fetchChatMessagesBetweenUsers({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.fetchChatMessagesBetweenUsers, data);
    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const fetchUsersChatListWatcherSaga = function* fetchUsersChatListWatcherSaga() {
  yield takeLatest(types.FETCH_USERS_CHAT_LIST, fetchUsersChatList);
};

const fetchChatMessagesWatcherSaga = function* fetchChatMessagesWatcherSaga() {
  yield takeLatest(types.FETCH_CHAT_MESSAGES, fetchChatMessages);
};

const fetchChatMessagesBetweenUsersWatcherSaga = function* fetchChatMessagesBetweenUsersWatcherSaga() {
  yield takeLatest(types.FETCH_CHAT_MESSAGES_BETWEEN_USERS, fetchChatMessagesBetweenUsers);
};

export default [
  fetchUsersChatListWatcherSaga(),
  fetchChatMessagesWatcherSaga(),
  fetchChatMessagesBetweenUsersWatcherSaga(),
];
