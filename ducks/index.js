/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { STORAGE_KEY } from 'shared/storage';
import authenticationReducer, { key as AUTHENTICATION_KEY, types } from './authentication';
import languageReducer, { key as LANGUAGE_KEY } from './language';
import meReducer, { key as ME_KEY } from './me';
import documentsReducer, { key as DOCUMENTS_KEY } from './documents';

const appReducer = combineReducers({
  [LANGUAGE_KEY]: languageReducer,
  [AUTHENTICATION_KEY]: authenticationReducer,
  [ME_KEY]: meReducer,
  [DOCUMENTS_KEY]: documentsReducer,
});

const reducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    storage.removeItem(STORAGE_KEY);
    state = undefined;
  }
  return appReducer(state, action);
};

export default reducer;
