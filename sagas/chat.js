import { types } from 'ducks/chat';
import { call, takeLatest, delay } from 'redux-saga/effects';
import { service } from 'services/chat';
import { request } from 'shared/types';

const messageList = [
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 2 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 2 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
  { name: 'Jennifer', description: 'Your house is amazing. Every window is perfect.', count: 0 },
];

const conversationList = [
  { message: 'Your house is amazing. Every window is perfect.', isYou: true },
  { message: 'Your house is amazing. Every window is perfect.', isYou: true },
  { message: 'Your house is amazing. Every window is perfect.', isYou: false },
  { message: 'Your house is amazing. Every window is perfect.', isYou: true },
  { message: 'Your house is amazing. Every window is perfect.', isYou: true },
  { message: 'Your house is amazing. Every window is perfect.', isYou: false },
  { message: 'Your house is amazing. Every window is perfect.', isYou: true },
  { message: 'Your house is amazing. Every window is perfect.', isYou: true },
  { message: 'Your house is amazing. Every window is perfect.', isYou: false },
  { message: 'Your house is amazing. Every window is perfect.', isYou: true },
  { message: 'Your house is amazing. Every window is perfect.', isYou: false },
  { message: 'Your house is amazing. Every window is perfect.', isYou: false },
];

/* WORKERS */
function* fetchChatMessages({ payload }) {
  const { callback, id, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    // const response = yield call(service.fetchChatMessages, id, data);
    yield delay(1000);
    callback({ status: request.SUCCESS, response: messageList });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* fetchChatMessagesBetweenUsers({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    // const response = yield call(service.fetchChatMessagesBetweenTwoUsers, data);
    yield delay(1000);
    callback({ status: request.SUCCESS, response: conversationList });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const fetchChatMessagesWatcherSaga = function* fetchChatMessagesWatcherSaga() {
  yield takeLatest(types.FETCH_CHAT_MESSAGES, fetchChatMessages);
};

const fetchChatMessagesBetweenUsersWatcherSaga = function* fetchChatMessagesBetweenUsersWatcherSaga() {
  yield takeLatest(types.FETCH_CHAT_MESSAGES_BETWEEN_USERS, fetchChatMessagesBetweenUsers);
};

export default [fetchChatMessagesWatcherSaga(), fetchChatMessagesBetweenUsersWatcherSaga()];
