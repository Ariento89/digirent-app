import { combineReducers } from 'redux';
import authenticationReducer, { key as AUTHENTICATION_KEY } from './authentication';
import languageReducer, { key as LANGUAGE_KEY } from './language';

export default combineReducers({
  [LANGUAGE_KEY]: languageReducer,
  [AUTHENTICATION_KEY]: authenticationReducer,
});
