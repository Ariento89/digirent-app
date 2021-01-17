import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

export const key = 'ME';

export const types = {
  SAVE: `${key}/SAVE`,
  GET_ME: `${key}/LOGOUT`,
  UPDATE_PROFILE_INFORMATION: `${key}/UPDATE_PROFILE_INFORMATION`,
  UPDATE_PASSWORD: `${key}/UPDATE_PASSWORD`,
  SET_USER_BANK_DETAILS: `${key}/SET_USER_BANK_DETAILS`,
  SET_TENANT_LOOKING_FOR: `${key}/SET_TENANT_LOOKING_FOR`,
};

const initialState = {
  me: null,
};

const reducer = handleActions(
  {
    [types.SAVE]: (state, { payload }) => {
      const { type } = payload;
      let newData = {};

      switch (type) {
        case types.GET_ME:
        case types.UPDATE_PROFILE_INFORMATION:
        case types.UPDATE_PASSWORD:
        case types.SET_USER_BANK_DETAILS:
        case types.SET_TENANT_LOOKING_FOR: {
          newData = { me: payload.me };
          break;
        }
      }

      return { ...state, ...newData };
    },
  },
  initialState,
);

export const actions = {
  save: createAction(types.SAVE),
  getMe: createAction(types.GET_ME),
  updateProfileInformation: createAction(types.UPDATE_PROFILE_INFORMATION),
  updatePassword: createAction(types.UPDATE_PASSWORD),
  setUserBankDetails: createAction(types.SET_USER_BANK_DETAILS),
  setTenantLookingFor: createAction(types.SET_TENANT_LOOKING_FOR),
};

const selectState = (state) => state[key] || initialState;
export const selectors = {
  selectMe: () => createSelector(selectState, (state) => state.me),
};

export default reducer;
