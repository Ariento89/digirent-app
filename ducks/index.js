import { combineReducers } from 'redux';
import languageReducer, { key as LANGUAGE_KEY } from './language';

export default combineReducers({
  [LANGUAGE_KEY]: languageReducer,
});
