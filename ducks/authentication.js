import { createSelector } from 'reselect';
import { createAction, handleActions } from 'redux-actions';

export const key = 'AUTHENTICATION';

export const types = {
  SAVE: `${key}/SAVE`,
  LOGOUT: `${key}/LOGOUT`,
  LOGIN: `${key}/LOGIN`,
  FORGOT_PASSWORD: `${key}/FORGOT_PASSWORD`,
  RESET_PASSWORD: `${key}/RESET_PASSWORD`,
};

const initialState = {
  accessToken: null,
  tokenType: null,
};

const reducer = handleActions(
  {
    [types.SAVE]: (state, { payload }) => {
      const { type } = payload;
      let newData = {};

      switch (type) {
        case types.LOGIN: {
          newData = {
            accessToken: payload.accessToken,
            tokenType: payload.tokenType,
          };

          break;
        }
      }

      return { ...state, ...newData };
    },

    [types.LOGOUT]: () => initialState,
  },
  initialState,
);

export const actions = {
  save: createAction(types.SAVE),
  login: createAction(types.LOGIN),
  logout: createAction(types.LOGOUT),
};

const selectState = (state) => state[key] || initialState;
export const selectors = {
  selectAccessToken: () => createSelector(selectState, (state) => state.accessToken),
};

export default reducer;
