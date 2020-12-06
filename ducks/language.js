import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { languageSwitchOptions } from 'shared/types';

export const key = 'LANGUAGE';

export const types = {
  SET_LANGUAGE: `${key}/SET_LANGUAGE`,
};

const initialState = {
  language: languageSwitchOptions.EN,
};

const reducer = handleActions(
  {
    [types.SET_LANGUAGE]: (state, { payload }) => {
      return { ...state, language: payload };
    },
  },
  initialState,
);

export const actions = {
  setLanguage: createAction(types.SET_LANGUAGE),
};

const selectState = (state) => state[key] || initialState;
export const selectors = {
  selectLanguage: () => createSelector(selectState, (state) => state.language),
};

export default reducer;
