import { role } from './types';

export const HOME_ROUTE = '/';

const ROUTES = {
  '/account': [role.LANDLORD, role.TENANT],
  '/my-properties': [role.LANDLORD],
  '/my-properties/add': [role.LANDLORD],
  '/my-properties/update/[id]': [role.LANDLORD],
  '/my-properties/duplicate/[id]': [role.LANDLORD],
  '/properties': [role.LANDLORD, role.TENANT],
  '/properties/[id]': [role.LANDLORD, role.TENANT],
  '/messages': [role.LANDLORD, role.TENANT],
};

export default ROUTES;
