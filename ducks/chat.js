import { createAction } from 'redux-actions';

export const key = 'CHAT';

export const types = {
  FETCH_CHAT_MESSAGES: `${key}/FETCH_CHAT_MESSAGES`,
  FETCH_CHAT_MESSAGES_BETWEEN_USERS: `${key}/FETCH_CHAT_MESSAGES_BETWEEN_USERS`,
};

export const actions = {
  fetchChatMessages: createAction(types.FETCH_CHAT_MESSAGES),
  fetchChatMessagesBetweenUsers: createAction(types.FETCH_CHAT_MESSAGES_BETWEEN_USERS),
};
