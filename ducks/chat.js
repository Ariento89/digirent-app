import { createAction } from 'redux-actions';

export const key = 'CHAT';

export const types = {
  FETCH_USERS_CHAT_LIST: `${key}/FETCH_USERS_CHAT_LIST`,
  FETCH_CHAT_MESSAGES: `${key}/FETCH_CHAT_MESSAGES`,
  FETCH_CHAT_MESSAGES_BETWEEN_USERS: `${key}/FETCH_CHAT_MESSAGES_BETWEEN_USERS`,
};

export const actions = {
  fetchUsersChatList: createAction(types.FETCH_USERS_CHAT_LIST),
  fetchChatMessages: createAction(types.FETCH_CHAT_MESSAGES),
  fetchChatMessagesBetweenUsers: createAction(types.FETCH_CHAT_MESSAGES_BETWEEN_USERS),
};
