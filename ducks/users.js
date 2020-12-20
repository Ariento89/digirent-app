import { createAction, handleActions } from 'redux-actions';

export const key = 'USERS';

export const types = {
  REGISTER_TENANT: `${key}/REGISTER_TENANT`,
  REGISTER_LANDLORD: `${key}/REGISTER_LANDLORD`,
  FETCH_ALL_USERS: `${key}/FETCH_ALL_USERS`,
  FETCH_ALL_LANDLORDS: `${key}/FETCH_ALL_LANDLORDS`,
  FETCH_ALL_TENANTS: `${key}/FETCH_ALL_TENANTS`,
  VERIFY_EMAIL: `${key}/VERIFY_EMAIL`,
};

const initialState = {};

const reducer = handleActions({}, initialState);

export const actions = {
  registerTenant: createAction(types.REGISTER_TENANT),
  registerLandlord: createAction(types.REGISTER_LANDLORD),
  fetchAllUsers: createAction(types.FETCH_ALL_USERS),
  fetchAllLandlords: createAction(types.FETCH_ALL_LANDLORDS),
  fetchAllTenants: createAction(types.FETCH_ALL_TENANTS),
  verifyEmail: createAction(types.VERIFY_EMAIL),
};

export const selectors = {};

export default reducer;
